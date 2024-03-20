import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import RegisterLayout from 'src/layouts/RegisterLayout';
import MainLayout from './layouts/MainLayout';

const isAuthenticated = true;
function ProtectedRoute() {
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

export default function useRouteElements() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: <MainLayout></MainLayout>
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'profile',
          element: <MainLayout></MainLayout>
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: <RegisterLayout></RegisterLayout>
        },
        {
          path: '/register',
          element: <RegisterLayout></RegisterLayout>
        }
      ]
    }
  ]);
  return routeElements;
}
