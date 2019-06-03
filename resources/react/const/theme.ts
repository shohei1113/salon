import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  // #1
  palette: {
    primary: {
      light: '#58a5f0',
      main: '#0277bd',
      dark: '#004c8c',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ff5c8d',
      main: '#d81b60',
      dark: '#a00037',
      contrastText: '#ffffff',
    },
  },
})
