import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
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
      <TopBar />
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default AppDrawer