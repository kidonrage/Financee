import React, { Suspense } from 'react'
import { Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Container, LinearProgress, makeStyles } from '@material-ui/core'
import TopBar from '../../components/TopBar'
import styles from './styles'
import { useContext } from 'react'
import { AuthContext } from '../../components/Auth'

const useStyles = makeStyles(styles)

const AuthLayout = ({route}) => {
  const classes = useStyles()

  const {currentUser} = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <>
      <TopBar />
      <div className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          <Container maxWidth="lg">
            {renderRoutes(route.routes)}
          </Container>
        </Suspense>
      </div>
    </>
  )
}

export default AuthLayout