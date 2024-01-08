import { initializeGame } from '@canny-games/common';
import { EntityManager, ObjectId } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import { CreateMatchCommand } from '@/matches/application/commands/create-match/create-match.command';
import { UpdateMatchStateCommand } from '@/matches/application/commands/update-match-state/update-match-state.command';
import { MatchesRepository } from '@/matches/domain/matches.repository';
import { UserEntity } from '@/users/infrastructure/orm/entities/user.entity';
import { MatchOrmEntity } from '../entities/match.orm.entity';

@Injectable()
export class MatchesOrmRepository extends MatchesRepository {
  constructor(private readonly em: EntityManager) {
    super();
  }

  async create(command: CreateMatchCommand): Promise<MatchOrmEntity> {
    const { boardSize, winningCondition, playerXId, playerOId } = command;

    const newMatchState = initializeGame({
      settings: { size: boardSize, winCondition: winningCondition },
    });

    const createdMatchEntity = await this.em.create(MatchOrmEntity, {
      playerX: new ObjectId(playerXId),
      playerO: new ObjectId(playerOId),
      state: newMatchState,
    });

    await this.em.persistAndFlush(createdMatchEntity);

    return createdMatchEntity;
  }

  async updateStateById(
    command: UpdateMatchStateCommand,
  ): Promise<MatchOrmEntity> {
    const { matchId, state } = command;

    const match = await this.em.findOneOrFail(MatchOrmEntity, matchId);

    match.state = state;
    // TODO: move it somwhere else and rewrite xD
    if (state.winner !== null && state.winner !== 'DRAW') {
      const winnerUser = await this.em.findOneOrFail(UserEntity, {
        id: state.winner === 'X' ? match.playerX.id : match.playerO.id,
      });
      match.winner = winnerUser;
    }

    await this.em.persistAndFlush(match);

    return match;
  }

  async getById(matchId: string): Promise<MatchOrmEntity> {
    const match = await this.em.findOneOrFail(MatchOrmEntity, matchId, {
      populate: ['playerX', 'playerO'],
    });

    return match;
  }

  async getPlayersIdsByMatchId(matchId: string): Promise<string[]> {
    const match = await this.em.findOneOrFail(MatchOrmEntity, matchId, {
      populate: ['playerX', 'playerO'],
    });

    return [match.playerX.id, match.playerO.id];
  }

  async getFinishedMatchesByUserId(userId: string): Promise<MatchOrmEntity[]> {
    const matches = await this.em.find(
      MatchOrmEntity,
      {
        $or: [{ playerX: userId }, { playerO: userId }],
        winner: { $ne: null },
        state: { winner: { $ne: null } },
      },
      {
        populate: ['winner'],
      },
    );

    return matches;
  }
}
