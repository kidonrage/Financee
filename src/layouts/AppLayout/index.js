import React, {Suspense} from 'react'
import AppDrawer from '../../components/AppDrawer'
import { renderRoutes } from 'react-router-config'

const AppLayout = ({ route }) => {
  return (
    <AppDrawer>
      {renderRoutes(route.routes)}
    </AppDrawer>
  )
}

export default AppLayout