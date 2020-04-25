import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  Drawer,
  SwipeableDrawer,
  Hidden,
  List,
  CssBaseline,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import MenuCloseIcon from '@material-ui/icons/MenuOpen';
import MenuOpenIcon from '@material-ui/icons/Menu';
import styles from './styles'
import TopBar from '../TopBar'
import NavList from '../NavList/NavList'

const useStyles = makeStyles(styles)

const AppDrawer = ({children}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar 
        withMenu
        handleDrawerOpen={() => setOpen(true)}
      />

      <Hidden mdDown>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx(classes.drawerContent, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div>
            <div className={classes.toolbar} />
            <Divider />
            <NavList />
          </div>
          <div>
            <Divider />
            <List>
              <ListItem 
                button
                onClick={handleDrawerToggle}
              >
                <ListItemIcon>{open ? <MenuCloseIcon /> : <MenuOpenIcon />}</ListItemIcon>
                <ListItemText primary={open ? "Свернуть" : "Развернуть"} />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </Hidden>

      <Hidden mdUp>
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <div className={classes.drawerOpen}>
            <NavList />
          </div>
        </SwipeableDrawer>
      </Hidden>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default AppDrawer