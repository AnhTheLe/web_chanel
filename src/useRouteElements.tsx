import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import RegisterLayout from 'src/layouts/RegisterLayout';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import Products from './pages/Products/Products';
import Blogs from './pages/Blogs/Blogs';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { useContext } from 'react';
import { AppContext } from './contexts/app.context';
import Profile from './pages/User/pages/Profile';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import path from './constants/path';

// const isAuthenticated = true;
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <MainLayout></MainLayout> : <Navigate to='/login' />;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);

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
    // {
    //   path: '',
    //   element: <MainLayout></MainLayout>,
    //   children: [
    //     {
    //       index: true,
    //       path: '/home',
    //       element: <HomePage />
    //     },
    //     {
    //       path: '/products',
    //       element: <Products />
    //     },
    //     {
    //       path: '/blogs',
    //       element: <Blogs />
    //     },
    //     {
    //       path: '/about',
    //       element: <div>About</div>
    //     }
    //   ]
    // },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/account/login',
          element: <Login></Login>
        },
        {
          path: '/account/sign-in',
          element: <Register></Register>
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
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
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'cart',
          element: <ShoppingCart></ShoppingCart>
        },
        {
          path: path.productDetail,
          element: <ProductDetail />
        }
      ]
    }
  ]);
  return routeElements;
}
