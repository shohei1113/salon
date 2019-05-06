import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'

const middlewares: Array<any> = []

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

export const store = createStore(reducer, applyMiddleware(...middlewares))
