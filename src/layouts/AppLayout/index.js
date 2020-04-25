import React from 'react'
import { renderRoutes } from 'react-router-config'
import { Container } from '@material-ui/core'
import AppDrawer from '../../components/AppDrawer'
import AddButton from '../../components/AddButton'

const AppLayout = ({ route }) => {
  return (
    <AppDrawer>
      <Container maxWidth="lg">
        {renderRoutes(route.routes)}
      </Container>
      <AddButton />
    </AppDrawer>
  )
}

export default AppLayout