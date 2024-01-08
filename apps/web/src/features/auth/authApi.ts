import {
  CredentialsSignInResponseData,
  CredentialsSignUpResponseData,
} from '@canny-games/common';
import { rootApi } from '@/api';
import { userApi } from '../user/userApi';
import { SignInFormFieldValues } from './components/SignInForm/SignInForm.types';
import { SignUpFormFieldValues } from './components/SignUpForm/SignUpForm.types';

export const authApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    credentialsSignIn: builder.mutation<
      CredentialsSignInResponseData,
      SignInFormFieldValues
    >({
      query: (data) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
    credentialsSignUp: builder.mutation<
      CredentialsSignUpResponseData,
      SignUpFormFieldValues
    >({
      query: (data) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<null, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCredentialsSignInMutation,
  useCredentialsSignUpMutation,
  useLogoutMutation,
} = authApi;
