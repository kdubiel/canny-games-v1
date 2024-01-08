import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logout } from '@/features/user/userSlice';
import { RouterPaths } from '@/router/paths';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({ baseUrl: '/api' });

export const authorizedFetchBase: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { url: 'auth/refresh-token', method: 'POST', credentials: 'include' },
          api,
          extraOptions,
        );

        if (!refreshResult.error) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
          window.location.href = RouterPaths.SignIn;
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default authorizedFetchBase;
