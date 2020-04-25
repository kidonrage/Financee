import React, {Suspense} from 'react'
import { Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { LinearProgress } from '@material-ui/core';
import history from './utils/history'
import routes from './routes'
import theme from './theme'

function App() {
  return (
    <Router history={history}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {renderRoutes(routes)}
      </ThemeProvider>
    </Router>
  )
}

export default App
