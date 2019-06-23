const initialState = {
  posts: [],
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'member/fetchPosts':
      return { ...state, posts: action.payload.data }
    case 'member/addPost':
      return { ...state, posts: [action.payload.data, ...state.posts] }
    default:
      return state
  }
}

export const fetchPosts = (payload: any) => ({
  type: 'member/fetchPosts',
  payload,
})

export const addPost = (payload: any) => ({
  type: 'member/addPost',
  payload,
})
