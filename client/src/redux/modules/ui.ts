const initialState = {
  isLoading: false,
  isOpenNav: false,
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'ui/toggleNav':
      return { ...state, isOpenNav: !state.isOpenNav }
    default:
      return state
  }
}

export const toggleNav = () => ({ type: 'ui/toggleNav' })
