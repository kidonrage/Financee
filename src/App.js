import React from 'react'
import { Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import CssBaseline from '@material-ui/core/CssBaseline'
import history from './utils/history'
import routes from './routes'

function App() {
  return (
    <Router history={history}>
      <CssBaseline />
      {renderRoutes(routes)}
    </Router>
  )
}

export default App
