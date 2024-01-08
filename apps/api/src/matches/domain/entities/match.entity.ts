import { TicTacToeGameState } from '@canny-games/common';
import { MatchDto } from '@/matches/public/dto/match.dto';
import { User } from '@/users/domain/interfaces/user.interface';

export interface MatchEntity {
  id: string;
  playerX: User;
  playerO: User;
  winner: User | null;
  state: TicTacToeGameState;
  createdAt: Date;
  updatedAt: Date;

  toDto: () => MatchDto;
}
