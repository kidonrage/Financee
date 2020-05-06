import React, {Suspense, useContext} from 'react'
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
  ListItemText,
  LinearProgress
} from '@material-ui/core'
import MenuCloseIcon from '@material-ui/icons/MenuOpen';
import MenuOpenIcon from '@material-ui/icons/Menu';
import styles from './styles'
import TopBar from '../TopBar'
import NavList from '../NavList/NavList'
import { LoadingContext } from '../Loading'

const useStyles = makeStyles(styles)

const AppDrawer = ({children}) => {
  const classes = useStyles()
  const {loading} = useContext(LoadingContext)

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
            <NavList onClick={() => setOpen(false)} />
          </div>
        </SwipeableDrawer>
      </Hidden>
      
      <div className={classes.contentWrapper}>
        <Suspense fallback={<LinearProgress className={classes.progressBar} />}>
          {loading && <LinearProgress className={classes.progressBar} />}
          <main className={classes.content}>
            {children}
          </main>
        </Suspense>
      </div>
    </div>
  )
}

export default AppDrawer