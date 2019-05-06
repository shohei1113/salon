const initialState = {
  isLoading: false,
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'ui/setLoading':
      return { ...state, isLoading: true }
    case 'ui/clearLoading':
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export const setLoading = () => ({ type: 'ui/setLoading' })
export const clearLoading = () => ({ type: 'ui/clearLoading' })
