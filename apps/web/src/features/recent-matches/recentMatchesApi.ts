import { FinishedMatch } from '@canny-games/common';
import { rootApi } from '@/api';

export const recentMatchesApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getRecentMatches: builder.query<{ matches: FinishedMatch[] }, null>({
      query: () => ({
        url: '/matches',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetRecentMatchesQuery } = recentMatchesApi;
