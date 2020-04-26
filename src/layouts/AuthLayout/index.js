import React, { Suspense } from 'react'
import { renderRoutes } from 'react-router-config'
import { Container, LinearProgress, makeStyles } from '@material-ui/core'
import TopBar from '../../components/TopBar'
import styles from './styles'

const useStyles = makeStyles(styles)

const AuthLayout = ({route}) => {
  const classes = useStyles()

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