import Joi from 'joi';
import { TicTacToeGameState } from '../engine';
import { TicTacToeGameStateSchema } from './game-state.schema';

export interface TicTacToeGameStateChangedMessagePayload {
  matchId: string;
  currentPlayerId: string;
  state: TicTacToeGameState;
}

export const TicTacToeGameStateChangedMessageSchema =
  Joi.object<TicTacToeGameStateChangedMessagePayload>().keys({
    matchId: Joi.string().required(),
    state: TicTacToeGameStateSchema,
  });
