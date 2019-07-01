const initialState = {
  isPrepared: false,
  isLoading: false,
  role: <1 | 2 | null>null, // 1: オーナー, 2: メンバー
  owner: {},
  posts: [],
}

export type State = typeof initialState

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'member/init':
      return { ...state, isPrepared: true, ...action.payload }
    case 'member/reset':
      return { ...initialState }
    case 'member/setLoading':
      return { ...state, isLoading: true }
    case 'member/clearLoading':
      return { ...state, isLoading: false }
    case 'member/fetchPosts':
      return { ...state, posts: action.payload.data.salon.posts }
    case 'member/createPost':
      return { ...state, posts: [action.payload, ...state.posts] }
    case 'member/deletePost':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload.id),
      }
    case 'member/editPost':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.id) {
            return action.payload
          }
          return post
        }),
      }
    case 'member/addComment':
      return { ...state, posts: state.posts.map(post => post) }
    default:
      return state
  }
}

export const init = (payload: any) => ({
  type: 'member/init',
  payload,
})
export const reset = () => ({
  type: 'member/reset',
})

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

export const createPost = (payload: any) => ({
  type: 'member/createPost',
  payload,
})
export const deletePost = (payload: any) => ({
  type: 'member/deletePost',
  payload,
})
export const editPost = (payload: any) => ({
  type: 'member/editPost',
  payload,
})

export const addComment = (payload: any) => ({
  type: 'member/addComment',
  payload,
})
