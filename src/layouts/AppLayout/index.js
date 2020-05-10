import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Container } from '@material-ui/core'
import AppDrawer from '../../components/AppDrawer'
import AddButton from '../../components/AddButton'
import UserDataProvider from '../../components/UserDataProvider'
import { AuthContext } from '../../components/Auth'

const AppLayout = ({ route }) => {
  const {authData} = useContext(AuthContext)

  if (!authData) {
    return <Redirect to="/auth/login" />
  }

  return (
    <AppDrawer>
      <UserDataProvider>
        <Container maxWidth="lg">
          {renderRoutes(route.routes)}
        </Container>
        <AddButton />
      </UserDataProvider> 
    </AppDrawer>
  )
}

export default AppLayout