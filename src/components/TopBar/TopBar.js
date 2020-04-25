import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import styles from './styles'

const useStyles = makeStyles(styles)

const TopBar = () => {
  const classes = useStyles()

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          FINANCEE
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar