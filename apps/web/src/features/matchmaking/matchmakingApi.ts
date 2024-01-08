import {
  TicTacToeGameStateChangedMessagePayload,
  TicTacToeMessages,
} from '@canny-games/common';
import { rootApi } from '@/api';
import { socketEmitAsPromise } from '@/shared/utils/socketEmitAsPromise';
import {
  setMatchId,
  setGameState,
  setCurrentPlayerId,
} from '../tic-tac-toe/ticTacToe.slice';
import { matchmakingSocket } from './MatchmakingSocket/MatchmakingSocket';

export const matchmakingApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    joinMatchmaking: builder.mutation<void, null>({
      queryFn: async () => {
        const promise = await socketEmitAsPromise(matchmakingSocket)(
          TicTacToeMessages.MatchmakingJoin,
          null,
        );

        return promise;
      },
    }),
    cancelMatchmaking: builder.mutation<void, null>({
      queryFn: async () => {
        const promise = await socketEmitAsPromise(matchmakingSocket)(
          TicTacToeMessages.MatchmakingCancel,
          null,
        );

        return promise;
      },
    }),
    listenToGameStarted: builder.query<
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

          matchmakingSocket.on(
            TicTacToeMessages.GameStateChanged,
            (data: TicTacToeGameStateChangedMessagePayload) => {
              updateCachedData(() => {
                return data;
              });
              dispatch(setGameState(data.state));
              dispatch(setMatchId(data.matchId));
              dispatch(setCurrentPlayerId(data.currentPlayerId));
            },
          );

          await cacheEntryRemoved;

          matchmakingSocket.off(TicTacToeMessages.GameStateChanged);
        } catch {}
      },
    }),
  }),
});

export const {
  useJoinMatchmakingMutation,
  useListenToGameStartedQuery,
  useCancelMatchmakingMutation,
} = matchmakingApi;
