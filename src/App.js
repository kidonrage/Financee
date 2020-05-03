import React from 'react'
import { Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import AuthProvider from './components/Auth'
import history from './utils/history'
import routes from './routes'
import theme from './theme'
import LoadingProvider from './components/Loading'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <LoadingProvider>
          <Router history={history}>
            {renderRoutes(routes)}
          </Router>
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
