import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

import { AuthRedirect } from 'src/components/auth-redirect';
import { ProtectedRoute } from 'src/components/protected-route';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const VerifyOtpPage = lazy(() => import('src/pages/verify-otp'));
export const FoodsPage = lazy(() => import('src/pages/foods'));
export const NewFoodPage = lazy(() => import('src/pages/new-food'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const ChangePasswordPage = lazy(() => import('src/pages/change-password'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthRedirect>
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      </AuthRedirect>
    ),
  },
  {
    path: 'sign-up',
    element: (
      <AuthRedirect>
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      </AuthRedirect>
    ),
  },
  {
    path: 'verify-otp',
    element: (
      <AuthRedirect>
        <AuthLayout>
          <VerifyOtpPage />
        </AuthLayout>
      </AuthRedirect>
    ),
  },
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'foods', element: <FoodsPage /> },
      { path: 'foods/new', element: <NewFoodPage /> },
    ],
  },
  {
    path: 'profile',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <ProfilePage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'change-password',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <ChangePasswordPage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'sign-in',
    element: (
      <AuthRedirect>
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      </AuthRedirect>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
