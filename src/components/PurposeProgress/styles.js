export default theme => ({
  purposeProgressInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3)
  },
  purposeNumbers: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: theme.spacing(1)
  }, 
  goalSavings: {
    fontWeight: theme.typography.fontWeightMedium
  },
  goalTotal: {
  },
  currency: {
    color: theme.palette.primary.main
  },
  purposeProgressCaption: {
    display: 'block',
    fontSize: 18,
  },
  progressBar: {
    marginTop: theme.spacing(1),
    borderRadius: 4
  }
})