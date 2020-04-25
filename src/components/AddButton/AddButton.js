import React, { useState } from 'react'
import onClickOutside from "react-onclickoutside";
import { Fab, Zoom, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import styles from './styles'
import clsx from 'clsx'

const useStyles = makeStyles(styles)

function AddButton() {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  AddButton.handleClickOutside = () => setOpen(false)

  return (
    <div className={clsx(classes.root, {
      [classes.rootOpen]: open
    })}>
      <Fab color="primary" aria-label="expand" className={classes.openButton} onClick={() => setOpen(true)}>
        <AttachMoneyIcon />
      </Fab>
      
      <div className={classes.actionButtonsContainer}>
        <Zoom in={open}>
          <Fab color="primary" aria-label="add income" className={clsx(classes.actionButton, classes.addIncome)}>
            <AddIcon />
          </Fab>
        </Zoom>
        <Zoom in={open}>
          <Fab color="secondary" aria-label="add expense" className={clsx(classes.actionButton, classes.addExpense)}>
            <RemoveIcon />
          </Fab>
        </Zoom>
      </div>
    </div>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => AddButton.handleClickOutside
};

export default onClickOutside(AddButton, clickOutsideConfig);