import React from 'react'
import { Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Container } from '@material-ui/core'
import AppDrawer from '../../components/AppDrawer'
import AddButton from '../../components/AddButton'
import { useContext } from 'react'
import { AuthContext } from '../../components/Auth'

const AppLayout = ({ route }) => {
  const {currentUser} = useContext(AuthContext)

  if (!currentUser) {
    return <Redirect to="/auth/login" />
  }

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