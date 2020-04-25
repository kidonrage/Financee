import React, { useState } from 'react'
import onClickOutside from "react-onclickoutside";
import { Fab, Zoom, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import styles from './styles'
import clsx from 'clsx'
import AddIncomeModal from '../AddIncomeModal';

const useStyles = makeStyles(styles)

function AddButton() {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [addIncomeModalOpen, setAddIncomeModalOpen] = useState(false)
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false)

  AddButton.handleClickOutside = () => setOpen(false)

  return (
    <>
      <div className={clsx(classes.root, {
        [classes.rootOpen]: open
      })}>
        <Fab color="primary" aria-label="expand" className={classes.openButton} onClick={() => setOpen(true)}>
          <AttachMoneyIcon />
        </Fab>
        
        <div 
          className={classes.actionButtonsContainer}
          onClick={() => setOpen(false)}
        >
          <Zoom in={open}>
            <Fab 
              onClick={() => setAddIncomeModalOpen(true)}
              color="primary" 
              aria-label="add income" 
              className={clsx(classes.actionButton, classes.addIncome)}
            >
              <AddIcon />
            </Fab>
          </Zoom>
          <Zoom in={open}>
            <Fab 
              onClick={() => setAddExpenseModalOpen(true)}
              color="secondary" 
              aria-label="add expense" 
              className={clsx(classes.actionButton, classes.addExpense)}
            >
              <RemoveIcon />
            </Fab>
          </Zoom>
        </div>
      </div>

      <AddIncomeModal 
        open={addIncomeModalOpen}
        handleClose={() => setAddIncomeModalOpen(false)}
      />
    </>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => AddButton.handleClickOutside
};

export default onClickOutside(AddButton, clickOutsideConfig);