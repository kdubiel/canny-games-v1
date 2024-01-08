import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetMeQuery, userApi } from '@/features/user/userApi';
import { RouterPaths } from '@/router/paths';
import { FullScreenLoader } from '../FullScreenLoader';

export const ProtectedRoute = () => {
  const location = useLocation();

  const { isLoading, isFetching } = useGetMeQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data!,
  });

  if (loading) {
    return <FullScreenLoader />;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to={RouterPaths.SignIn}
      state={{ from: location }}
      replace
    />
  );
};
