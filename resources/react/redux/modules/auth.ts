const initialState = {
  isLoggedin: false,
  token: undefined,
  user: undefined,
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'auth/initAuth':
      return {
        ...state,
        isLoggedin: true,
        token: action.payload.token,
        user: action.payload.user,
      }
    case 'auth/loginAuth':
      return {
        ...state,
        isLoggedin: true,
        user: action.payload.user,
      }
    default:
      return state
  }
}

export const initAuth = (payload: any) => ({ type: 'auth/initAuth', payload })
export const loginAuth = (payload: any) => ({ type: 'auth/loginAuth', payload })
