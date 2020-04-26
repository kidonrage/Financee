export default theme => ({
  content: {
    marginTop: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8)
    }
  }
})