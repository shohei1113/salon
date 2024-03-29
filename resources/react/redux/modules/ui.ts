const initialState = {
  isLoading: false,
  isOpenNav: false,
  modal: {
    isOpen: false,
    title: '',
    description: '',
    callback: () => {},
  },
  snackbar: {
    isOpen: false,
    variant: '',
    message: '',
  },
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'ui/setLoader':
      return { ...state, isLoading: true }
    case 'ui/clearLoader':
      return { ...state, isLoading: false }
    case 'ui/toggleNav':
      return { ...state, isOpenNav: !state.isOpenNav }
    case 'ui/setModal':
      return {
        ...state,
        modal: {
          isOpen: true,
          title: action.payload.title,
          description: action.payload.description,
          callback: action.payload.callback,
        },
      }
    case 'ui/clearModal':
      return {
        ...state,
        modal: {
          isOpen: false,
          title: '',
          description: '',
          callback: () => {},
        },
      }
    case 'ui/setSnackbar':
      return {
        ...state,
        snackbar: {
          isOpen: true,
          variant: action.payload.variant,
          message: action.payload.message,
        },
      }
    case 'ui/clearSnackbar':
      return {
        ...state,
        snackbar: {
          isOpen: false,
          variant: '',
          message: '',
        },
      }
    default:
      return state
  }
}

export const setLoader = () => ({ type: 'ui/setLoader' })
export const clearLoader = () => ({ type: 'ui/clearLoader' })
export const toggleNav = () => ({ type: 'ui/toggleNav' })
export const setModal = (payload: any) => ({
  type: 'ui/setModal',
  payload,
})
export const clearModal = () => ({
  type: 'ui/clearModal',
})
export const setSnackbar = (payload: any) => ({
  type: 'ui/setSnackbar',
  payload,
})
export const clearSnackbar = () => ({
  type: 'ui/clearSnackbar',
})
