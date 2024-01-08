import { createApi } from '@reduxjs/toolkit/query/react';
import { authorizedFetchBase } from './authorizedFetchBase';

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: authorizedFetchBase,
  endpoints: (builder) => ({
    getHelloWorld: builder.query<string, null>({
      query: () => ({
        url: '/hello-world',
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
});

export const { useGetHelloWorldQuery } = rootApi;
