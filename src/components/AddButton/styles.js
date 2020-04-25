export default theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  rootOpen: {
    '& $openButton': {
      opacity: 0.5,
      pointerEvents: 'none'
    },
  },
  openButton: {
    
  },
  actionButtonsContainer: {

  },
  actionButton: {
    width: 40,
    height: 40,
    position: 'absolute'
  },
  addIncome: {
    top: -30,
    left: -29
  },
  addExpense: {
    top: 12,
    left: -45
  }
})