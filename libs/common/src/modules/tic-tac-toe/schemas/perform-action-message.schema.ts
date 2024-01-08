import Joi from 'joi';
import { TicTacToePlayerAction } from '../engine';

export interface TicTacToePerformActionMessagePayload {
  matchId: string;
  playerAction: TicTacToePlayerAction;
}

export const TicTacToePerformActionMessagePayloadSchema =
  Joi.object<TicTacToePerformActionMessagePayload>().keys({
    matchId: Joi.string().required(),
    playerAction: Joi.object<TicTacToePlayerAction>().keys({
      row: Joi.number().required(),
      col: Joi.number().required(),
    }),
  });
