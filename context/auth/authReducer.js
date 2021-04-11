import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'

const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: JSON.parse(action.payload.user),
        credentials: JSON.parse(action.payload.credentials)
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      const credentials = JSON.stringify({ token: action.payload?.data?.user?.authentication_token, email: action.payload?.data?.user?.email })
      const user = JSON.stringify({ user: action.payload?.data?.user })
      localStorage.setItem('credentials', credentials)
      localStorage.setItem('user', user)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('credentials')
      localStorage.removeItem('user')
      return {
        ...state,
        credentials: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

export default authReducer