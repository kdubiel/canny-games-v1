import { Inject, Injectable } from '@nestjs/common';

import { FinishedMatch, MatchResult } from '@canny-games/common';
import { MatchesRepository } from '@/matches/domain/matches.repository';
import { InjectToken } from 'src/shared/injectToken';
import { MatchDto } from '@/matches/public/dto/match.dto';
import { CreateMatchCommand } from '../commands/create-match/create-match.command';
import { UpdateMatchStateCommand } from '../commands/update-match-state/update-match-state.command';

@Injectable()
export class MatchesService {
  constructor(
    @Inject(InjectToken.MatchesRepository)
    private readonly matchesRepository: MatchesRepository,
  ) {}

  async createMatch(command: CreateMatchCommand): Promise<MatchDto> {
    const match = await this.matchesRepository.create(command);
    return match.toDto();
  }

  async getMatchById(matchId: string): Promise<MatchDto> {
    const gameState = await this.matchesRepository.getById(matchId);

    return gameState.toDto();
  }

  async updateStateById(command: UpdateMatchStateCommand): Promise<MatchDto> {
    const newGameState = await this.matchesRepository.updateStateById(command);

    return newGameState.toDto();
  }

  async getPlayersIdsByMatchId(matchId: string): Promise<string[]> {
    const playersIds = await this.matchesRepository.getPlayersIdsByMatchId(
      matchId,
    );

    return playersIds;
  }

  async getMatchesResultsByUserId(userId: string) {
    const matches = await this.matchesRepository.getFinishedMatchesByUserId(
      userId,
    );

    const results: FinishedMatch[] = matches.map((match) => {
      const { winner, createdAt } = match;

      console.info('Winner: ', winner);

      return {
        startedAt: createdAt,
        matchResult:
          match.state.winner === 'DRAW'
            ? MatchResult.DRAW
            : winner.id === userId
            ? MatchResult.WIN
            : MatchResult.LOSS,
      };
    });

    return results;
  }
}
