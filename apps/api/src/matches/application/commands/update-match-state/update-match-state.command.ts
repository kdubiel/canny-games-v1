import { TicTacToeGameState } from '@canny-games/common';

export type UpdateMatchStateCommand = {
  matchId: string;
  state: TicTacToeGameState;
};
