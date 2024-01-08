import {
  TicTacToeGameStateChangedMessagePayload,
  TicTacToeMessages,
  TicTacToePerformActionMessagePayload,
} from '@canny-games/common';
import { rootApi } from '@/api';
import { socketEmitAsPromise } from '@/shared/utils/socketEmitAsPromise';
import { ticTacToeSocket } from './TicTacToeSocket/TicTacToeSocket';
import { setCurrentPlayerId, setGameState } from './ticTacToe.slice';

export const ticTacToeApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    performAction: builder.mutation<void, TicTacToePerformActionMessagePayload>(
      {
        queryFn: async (payload) => {
          const promise = await socketEmitAsPromise(ticTacToeSocket)(
            TicTacToeMessages.PerformAction,
            payload,
          );

          return promise;
        },
      },
    ),
    gameStateListener: builder.query<
      TicTacToeGameStateChangedMessagePayload | null,
      null
    >({
      queryFn: () => ({ data: null }),
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch },
      ) {
        try {
          await cacheDataLoaded;

          ticTacToeSocket.on(
            TicTacToeMessages.GameStateChanged,
            (data: TicTacToeGameStateChangedMessagePayload) => {
              updateCachedData(() => {
                return data;
              });
              dispatch(setGameState(data.state));
              dispatch(setCurrentPlayerId(data.currentPlayerId));
            },
          );

          await cacheEntryRemoved;

          ticTacToeSocket.off(TicTacToeMessages.GameStateChanged);
        } catch {}
      },
    }),
  }),
});

export const { usePerformActionMutation, useGameStateListenerQuery } =
  ticTacToeApi;
