import { Navigate, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { BlankLayout } from '@/components/layouts/BlankLayout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { LazySuspense } from '@/components/common/LazySuspense';
import { RouterPaths } from './paths';

const HomePage = lazy(async () => ({
  default: (await import('@/features/home/HomePage')).HomePage,
}));

const TicTacToePage = lazy(async () => ({
  default: (await import('@/features/tic-tac-toe/TicTacToePage')).TicTacToePage,
}));

const SignInPage = lazy(async () => ({
  default: (await import('@/features/auth/SignInPage')).SignInPage,
}));

const SignUpPage = lazy(async () => ({
  default: (await import('@/features/auth/SignUpPage')).SignUpPage,
}));

const RootLayout = lazy(async () => ({
  default: (await import('@/components/layouts/RootLayout')).RootLayout,
}));

const ErrorPage = lazy(async () => ({
  default: (await import('@/components/common/ErrorPage')).ErrorPage,
}));

// const MatchmakingPage = lazy(async () => ({
//   default: (await import('@/features/matchmaking/MatchmakingPage'))
//     .MatchmakingPage,
// }));

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <LazySuspense />,
    children: [
      {
        index: true,
        element: <Navigate to={RouterPaths.Home} />,
      },
      {
        element: <BlankLayout />,
        children: [
          {
            path: RouterPaths.SignIn,
            element: <SignInPage />,
          },
          {
            path: RouterPaths.SignUp,
            element: <SignUpPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <RootLayout />,
            children: [
              {
                path: RouterPaths.Home,
                element: <HomePage />,
              },
              {
                path: RouterPaths.TicTacToe,
                element: <TicTacToePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
