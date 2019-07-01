const initialState = {
  isPrepared: false,
  role: null,
  salon: {
    id: null,
    title: '',
    description: '',
    image_url: null,
    is_member: false,
    owner: {
      id: null,
      email: '',
      image_url: null,
      name: '',
    },
    price: 0,
    salon_detail: {
      id: null,
      salon_id: null,
      message: '',
      contents: '',
      target: '',
    },
  },
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'salon/init':
      return { ...state, isPrepared: true, ...action.payload }
    case 'salon/reset':
      return {
        ...state,
        isPrepared: false,
      }
    default:
      return state
  }
}

export const initSalon = (payload: any) => ({
  type: 'salon/init',
  payload,
})
export const resetSalon = () => ({
  type: 'salon/reset',
})
