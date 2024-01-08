import { TicTacToeGameState } from '@canny-games/common';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TicTacToeState {
  matchId: string | null;
  gameState: TicTacToeGameState | null;
  currentPlayerId: string | null;
}

const initialState: TicTacToeState = {
  matchId: null,
  gameState: null,
  currentPlayerId: null,
};

export const ticTacToeSlice = createSlice({
  initialState,
  name: 'ticTacToeSlice',
  reducers: {
    setGameState: (state, action: PayloadAction<TicTacToeGameState>) => {
      state.gameState = action.payload;
    },
    setMatchId: (state, action: PayloadAction<string>) => {
      state.matchId = action.payload;
    },
    setCurrentPlayerId: (state, action: PayloadAction<string>) => {
      state.currentPlayerId = action.payload;
    },
    restart: (state) => {
      state.gameState = null;
      state.matchId = null;
      state.currentPlayerId = null;
    },
  },
});

export const { setGameState, setMatchId, setCurrentPlayerId, restart } =
  ticTacToeSlice.actions;
