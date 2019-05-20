import { combineReducers } from 'redux'
import ui, { State as UiState } from './modules/ui'
import categories, { State as CategoriesState } from './modules/categories'

export default combineReducers({
  ui,
  categories,
})

export interface StoreState {
  ui: UiState
  categories: CategoriesState
}
