import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth, { State as AuthState } from './modules/auth'
import ui, { State as UiState } from './modules/ui'
import categories, { State as CategoriesState } from './modules/categories'
import salons, { State as Salons } from './modules/salons'
import member, { State as Member } from './modules/member'
import salon, { State as Salon } from './modules/salon'

export interface StoreState {
  auth: AuthState
  ui: UiState
  categories: CategoriesState
  salons: Salons
  member: Member
  salon: Salon
}

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['isPrepared', 'isLoggedin', 'user'],
}

export default combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  ui,
  categories,
  salons,
  member,
  salon,
})
