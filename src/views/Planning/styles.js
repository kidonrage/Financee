export default theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  monthTitle: {
    display: 'block',
    textAlign: 'left'
  },
  monthDates: {
    display: 'block',
    opacity: 0.7
  },
  cardAction: {
    marginTop: 0
  }
})