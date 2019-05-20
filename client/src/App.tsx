import React from 'react'
import { StoreContext } from 'redux-react-hook'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './const/theme'
import { store } from './redux/create-store'
import Router from './router'

const App: React.FC = () => {
  return (
    <div>
      <StoreContext.Provider value={store}>
        <GlobalStyle />
        <MuiThemeProvider theme={theme}>
          <Router />
        </MuiThemeProvider>
      </StoreContext.Provider>
    </div>
  )
}

const GlobalStyle = createGlobalStyle`
  ${reset}
`

export default App
