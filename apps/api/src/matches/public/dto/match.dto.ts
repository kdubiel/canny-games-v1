import { TicTacToeGameState } from '@canny-games/common';

export interface MatchDto {
  id: string;
  playerX: string;
  playerO: string;
  winner: string | null;
  state: TicTacToeGameState;
  createdAt: Date;
  updatedAt: Date;
}
