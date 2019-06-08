const initialState = {
  isLoggedin: false,
  jwt: 'hoge',
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'auth/init':
      return { ...state }
    default:
      return state
  }
}

export const initAuth = () => ({ type: 'auth/init' })
