import { AuthenticatedUser } from '@canny-games/common';
import { rootApi } from '@/api';
import { setUser } from './userSlice';

export const userApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMe: builder.query<AuthenticatedUser, null>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetMeQuery } = userApi;
