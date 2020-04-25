import React, {lazy} from 'react'
import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'

export default [
  {
    path: '/auth',
    component: AuthLayout
  },
  {
    route: '*',
    component: AppLayout,
    routes: [
      {
        path: '/dashboard',
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
        path: '/profile',
        exact: true,
        component: lazy(() => import('./views/Profile'))
      },
    ]
  }
]