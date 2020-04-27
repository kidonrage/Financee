export default theme => ({
  formCaption: {
    marginBottom: theme.spacing(3)
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  addIncomeSource: {
    marginLeft: 0,
    cursor: 'pointer',
    color: theme.palette.primary.main,
    opacity: 0.75,

    '&:hover': {
      textDecoration: 'underline',
      opacity: 1,
    }
  }
  // incomeAmount: {
  //   width: '100%'
  // },
  // incomeSource: {
  //   width: '100%'
  // }
})