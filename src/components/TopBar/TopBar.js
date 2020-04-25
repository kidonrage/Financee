import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Hidden } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import styles from './styles'

const useStyles = makeStyles(styles)

const TopBar = ({withMenu = false, handleDrawerOpen}) => {
  const classes = useStyles()

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
    >
      <Toolbar>
        {withMenu && (
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        )}
        <Typography variant="h6" noWrap>
          FINANCEE
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar