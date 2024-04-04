import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import RegisterLayout from 'src/layouts/RegisterLayout';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import Products from './pages/Products/Products';
import Blogs from './pages/Blogs/Blogs';
import Login from './pages/Login/Login';

const isAuthenticated = true;
function ProtectedRoute() {
  return isAuthenticated ? <MainLayout></MainLayout> : <Navigate to='/login' />;
}

function RejectedRoute() {
  return !isAuthenticated ? <MainLayout></MainLayout> : <Navigate to='/' />;
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
        },
        {
          path: '/products',
          element: <Products />
        },
        {
          path: '/blogs',
          element: <Blogs />
        },
        {
          path: '/about',
          element: <div>About</div>
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/account/login',
          element: <Login></Login>
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
