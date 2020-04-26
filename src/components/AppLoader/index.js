import React from 'react'
import TopBar from '../TopBar'
import { LinearProgress, makeStyles } from '@material-ui/core'
import styles from './styles'

const useStyles = makeStyles(styles)

const AppLoader = () => {
  const classes = useStyles()
  return (
    <>
      <TopBar />
      <div className={classes.content}>
        <LinearProgress />
      </div>
    </>
  )
}

export default AppLoader