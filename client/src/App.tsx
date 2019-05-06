import React from 'react'
import { StoreContext } from 'redux-react-hook'
import { store } from '../src/redux/create-store'
import Router from './router'

const App: React.FC = () => {
  return (
    <div>
      <StoreContext.Provider value={store}>
        <Router />
      </StoreContext.Provider>
    </div>
  )
}

export default App
