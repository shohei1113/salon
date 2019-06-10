const initialState = {
  salons: [
    {
      id: 1,
      title: 'サロンタイトル1',
      description: 'サロン詳細1',
      image: 'https://hayaokuri.com/image.png',
      owner: 'サロンオーナー名1',
    },
    {
      id: 2,
      title: 'サロンタイトル2',
      description: 'サロン詳細2',
      image: 'https://hayaokuri.com/image.png',
      owner: 'サロンオーナー名2',
    },
  ],
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'salons/init':
      return { ...state, salons: action.payload.salons }
    default:
      return state
  }
}

export const initSalons = (payload: any) => ({ type: 'salons/init', payload })
