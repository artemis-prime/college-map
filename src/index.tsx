import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import App from './App'

import theme from './style/theme'
const muiTheme = createTheme(theme)

ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={muiTheme}>
      <CssBaseline />
        <App />
      </ThemeProvider>,
    </React.StrictMode>,
  document.getElementById('root')
)
