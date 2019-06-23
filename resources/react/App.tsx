import React from 'react'
import { StoreContext } from 'redux-react-hook'
import { PersistGate } from 'redux-persist/integration/react'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './const/theme'
import createStore from './redux/create-store'
import { Auth } from './components/utils/auth'
import Router from './router'

const { store, persistor } = createStore()

const App: React.FC = () => {
  return (
    <div>
      <StoreContext.Provider value={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyle />
          <MuiThemeProvider theme={theme}>
            <Auth />
            <Router />
          </MuiThemeProvider>
        </PersistGate>
      </StoreContext.Provider>
    </div>
  )
}

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input {
    appearance: none;
  }
`

export default App
