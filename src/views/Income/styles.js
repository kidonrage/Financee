export default theme => ({
  root: {
    position: 'relative',
    paddingBottom: 80
  },
  table: {
    position: 'relative',
    zIndex: 10
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 130,
    margin: '0 auto',
    transition: 'bottom .25s ease',
  },
  activeLoader: {
    bottom: 0
  }
})