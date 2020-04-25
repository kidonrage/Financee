import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core'
import navConfig from './navConfig'
import { useHistory } from 'react-router-dom'

const NavList = () => {
  const history = useHistory()
  
  return (
    <List>
      {navConfig.map((navItem, index) => (
        <ListItem 
          button 
          key={index}
          onClick={() => history.push(navItem.href)}
        >
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