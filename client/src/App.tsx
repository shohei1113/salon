import React from 'react'
import { StoreContext } from 'redux-react-hook'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { store } from '../src/redux/create-store'
import Router from './router'

const App: React.FC = () => {
  return (
    <div>
      <StoreContext.Provider value={store}>
        <GlobalStyle />
        <Router />
      </StoreContext.Provider>
    </div>
  )
}

const GlobalStyle = createGlobalStyle`
  ${reset}
`

export default App
