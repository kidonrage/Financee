export default theme => ({
  content: {
    paddingTop: theme.spacing(7),
    maxWidth: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8)
    }
  }
})