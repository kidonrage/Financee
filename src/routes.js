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
      }
    ]
  }
]