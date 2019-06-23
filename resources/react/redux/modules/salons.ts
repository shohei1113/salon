const initialState = {
  salons: [
    {
      id: 1,
      title: 'サロンタイトル1',
      description: 'サロン詳細1',
      url: '/salon?salon-id=1',
      image: 'https://hayaokuri.com/image.png',
      owner: 'サロンオーナー名1',
    },
    {
      id: 2,
      title: 'サロンタイトル2',
      description: 'サロン詳細2',
      url: '/salon?salon-id=2',
      image: 'https://hayaokuri.com/image.png',
      owner: 'サロンオーナー名2',
    },
    {
      id: 3,
      title: 'サロンタイトル1',
      description: 'サロン詳細1',
      url: '/salon?salon-id=1',
      image: 'https://hayaokuri.com/image.png',
      owner: 'サロンオーナー名1',
    },
    {
      id: 4,
      title: 'サロンタイトル2',
      description: 'サロン詳細2',
      url: '/salon?salon-id=2',
      image: 'https://hayaokuri.com/image.png',
      owner: 'サロンオーナー名2',
    },
  ],

  // salons: [],
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'salons/init':
      return { ...state, salons: action.payload.data }
    default:
      return state
  }
}

export const initSalons = (payload: any) => ({ type: 'salons/init', payload })
