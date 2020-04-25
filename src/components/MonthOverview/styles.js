export default theme => ({
  content: {
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
    }
  },
  amount: {
    display: 'block'
  },
  caption: {
    opacity: 0.75
  }
})