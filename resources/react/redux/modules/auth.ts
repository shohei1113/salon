import { number } from '../../utils/validator'

const initialState = {
  isPrepared: false,
  isLoggedin: false,
  token: undefined,
  user: {
    id: <number | null>null,
    email: '',
    name: '',
    image_url: '',
  },
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'auth/initAuth':
      return {
        ...state,
        isPrepared: true,
        isLoggedin: true,
        token: action.payload.token,
        user: action.payload.user,
      }
    case 'auth/loginAuth':
      return {
        ...state,
        isPrepared: true,
        isLoggedin: true,
        user: action.payload.user,
      }
    case 'auth/resetAuth':
      return {
        ...state,
        isPrepared: true,
        isLoggedin: false,
        token: undefined,
        user: { ...initialState.user },
      }
    case 'auth/updateUser':
      return {
        ...state,
        user: action.payload.user,
      }
    default:
      return state
  }
}

export const initAuth = (payload: any) => ({ type: 'auth/initAuth', payload })
export const loginAuth = (payload: any) => ({ type: 'auth/loginAuth', payload })
export const resetAuth = () => ({ type: 'auth/resetAuth' })
export const updateUser = (payload: any) => ({
  type: 'auth/updateUser',
  payload,
})
