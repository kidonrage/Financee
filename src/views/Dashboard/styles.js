export default theme => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  bottomSpacingGrid: {
    '& >div': {
      marginBottom: theme.spacing(3),

      '&:last-child': {
        marginBottom: 0
      }
    }
  }
})