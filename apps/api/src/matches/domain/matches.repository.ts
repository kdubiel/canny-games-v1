import { CreateMatchCommand } from '../application/commands/create-match/create-match.command';
import { UpdateMatchStateCommand } from '../application/commands/update-match-state/update-match-state.command';
import { MatchEntity } from './entities/match.entity';

export abstract class MatchesRepository {
  abstract create(command: CreateMatchCommand): Promise<MatchEntity>;
  abstract getById(gameId: string): Promise<MatchEntity>;
  abstract updateStateById(
    command: UpdateMatchStateCommand,
  ): Promise<MatchEntity>;
  abstract getPlayersIdsByMatchId(matchId: string): Promise<string[]>;
  abstract getFinishedMatchesByUserId(userId: string): Promise<MatchEntity[]>;
}
