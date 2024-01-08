import Joi from 'joi';
import { TicTacToeGameState } from '../engine';

export const TicTacToeGameStateSchema = Joi.object<TicTacToeGameState>().keys({
  board: Joi.array().items(
    Joi.array().items(Joi.string().valid('X', 'O').allow(null)),
  ),
  currentPlayer: Joi.string().allow(null),
  settings: Joi.object().keys({
    size: Joi.number(),
    winCondition: Joi.number(),
  }),
  winner: Joi.string().allow(null),
});
