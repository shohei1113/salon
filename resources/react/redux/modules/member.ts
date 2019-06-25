const initialState = {
  isLoading: true,
  posts: [],
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'member/setLoading':
      return { ...state, isLoading: true }
    case 'member/clearLoading':
      return { ...state, isLoading: false }
    case 'member/fetchPosts':
      return { ...state, posts: action.payload.data.salon.post }
    case 'member/addPost':
      return { ...state, posts: [action.payload.data, ...state.posts] }
    case 'member/addComment':
      return { ...state, posts: state.posts.map(post => post) }
    default:
      return state
  }
}

export const setLoading = () => ({
  type: 'member/setLoading',
})
export const clearLoading = () => ({
  type: 'member/clearLoading',
})

export const fetchPosts = (payload: any) => ({
  type: 'member/fetchPosts',
  payload,
})

export const addPost = (payload: any) => ({
  type: 'member/addPost',
  payload,
})

export const addComment = (payload: any) => ({
  type: 'member/addComment',
  payload,
})
