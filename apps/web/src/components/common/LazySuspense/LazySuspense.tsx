import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { FullScreenLoader } from '../FullScreenLoader';

export const LazySuspense = () => (
  <Suspense fallback={<FullScreenLoader />}>
    <Outlet />
  </Suspense>
);
