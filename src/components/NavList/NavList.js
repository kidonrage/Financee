import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core'
import navConfig from './navConfig'

const NavList = () => {
  return (
    <List>
      {navConfig.map((navItem, index) => (
        <ListItem button key={index}>
          <ListItemIcon>
            <Icon component={navItem.icon} />
          </ListItemIcon>
          <ListItemText primary={navItem.title} />
        </ListItem>
      ))}
    </List>
  )
}

export default NavList