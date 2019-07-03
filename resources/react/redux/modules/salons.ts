const initialState = {
  category: {
    id: null,
    name: '',
    description: '',
    image_url: '',
    salons: [],
  },
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'salons/init':
      return { ...state, category: action.payload.data.category }
    default:
      return state
  }
}

export const initSalons = (payload: any) => ({ type: 'salons/init', payload })
