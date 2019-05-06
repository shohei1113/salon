import { combineReducers } from 'redux'
import ui, { State as UiState } from './modules/ui'

export default combineReducers({
  ui,
})

export interface StoreState {
  ui: UiState
}
