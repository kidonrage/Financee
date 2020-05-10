export default theme => ({
  goalInputContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: theme.spacing(4)
  },
  valueInput: {
    flexGrow: 1
  },
  formInput: {
    fontSize: 24
  },
  saveBtnWrapper: {
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
})