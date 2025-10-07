import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import AdminRoute from '../components/AdminRoute';
import './index.css';

import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound';
import TourPage from '../pages/TourPage';
import Layout from '../pages/Layout';
import Login from '../pages/Login';
import Singup from '../pages/Singup';
import Profile from '../pages/Profile/Profile';
import SettingsPage from '../pages/Profile/SettingsPage';
import BookingsPage from '../pages/Profile/BookingsPage';
import ReviewsPage from '../pages/Profile/ReviewsPage';
import BillingPage from '../pages/Profile/BillingPage';
import ManageTours from '../pages/Profile/AdminTabs/ManageTours';
import ManageUsers from '../pages/Profile/AdminTabs/ManageUsers';
import ManageReviews from '../pages/Profile/AdminTabs/ManageReviews';
import ManageBookings from '../pages/Profile/AdminTabs/ManageBookings';
import CheckLogin from '../components/CheckLogin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'tour/:tourSlug',
        element: <TourPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Singup />,
      },
      {
        path: 'me',
        element: (
          <CheckLogin>
            <Profile />
          </CheckLogin>
        ),
        children: [
          { index: true, path: 'settings', element: <SettingsPage /> },
          { path: 'bookings', element: <BookingsPage /> },
          { path: 'reviews', element: <ReviewsPage /> },
          { path: 'billing', element: <BillingPage /> },
          {
            path: 'managetours',
            element: (
              <AdminRoute>
                <ManageTours />
              </AdminRoute>
            ),
          },
          {
            path: 'manageusers',
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },
          {
            path: 'managereviews',
            element: (
              <AdminRoute>
                <ManageReviews />
              </AdminRoute>
            ),
          },
          {
            path: 'managebookings',
            element: (
              <AdminRoute>
                <ManageBookings />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
