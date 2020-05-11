import React, {lazy} from 'react'
import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'

export default [
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('./views/Login'))
      },
      {
        path: '/auth/registration',
        exact: true,
        component: lazy(() => import('./views/Registration'))
      },
    ]
  },
  {
    route: '*',
    component: AppLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('./views/Dashboard'))
      },
      {
        path: '/expenses',
        exact: true,
        component: lazy(() => import('./views/Expenses'))
      },
      {
        path: '/income',
        exact: true,
        component: lazy(() => import('./views/Income'))
      },
      {
        path: '/planning',
        exact: true,
        component: lazy(() => import('./views/Planning'))
      },
      {
        path: '/profile',
        exact: true,
        component: lazy(() => import('./views/Profile'))
      },
    ]
  }
]