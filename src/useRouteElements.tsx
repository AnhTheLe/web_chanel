import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import RegisterLayout from 'src/layouts/RegisterLayout';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';

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
      element: <Navigate to={`/home`} />
    },
    {
      path: '',
      element: <Navigate to={`/home`} />
    },
    {
      path: '',
      element: <MainLayout></MainLayout>,
      children: [
        {
          index: true,
          path: '/home',
          element: <HomePage />
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
