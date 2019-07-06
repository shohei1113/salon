import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import { version, migrations } from './migration'
import reducer from './reducer'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'ui', 'categories', 'salons', 'member', 'salon'],
  version,
  migrate: createMigrate(migrations, { debug: false }),
}
const persistedReducer = persistReducer(persistConfig, reducer)
const middlewares: Array<any> = []

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(...middlewares))
  const persistor = persistStore(store)
  return { store, persistor }
}
