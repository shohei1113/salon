const initialState = {
  categories: [],
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'categories/init':
      return { ...state, categories: action.payload.data }
    default:
      return state
  }
}

export const initCategories = (payload: any) => ({
  type: 'categories/init',
  payload,
})
