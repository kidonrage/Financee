import React from 'react'
import AppDrawer from '../../components/AppDrawer'
import { renderRoutes } from 'react-router-config'
import { Container } from '@material-ui/core'

const AppLayout = ({ route }) => {
  return (
    <AppDrawer>
      <Container maxWidth="lg">
        {renderRoutes(route.routes)}
      </Container>
    </AppDrawer>
  )
}

export default AppLayout