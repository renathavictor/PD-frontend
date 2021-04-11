import React, { useReducer, useContext } from 'react'

import api from '../../utils/api'
import AuthContext from './authContext'
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
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

const AuthState = props => {
  const initialState = {
    user: typeof window === 'undefined' ? null : localStorage.getItem('user'),
    credentials: typeof window === 'undefined' ? null : localStorage.getItem('credentials'),
    isAuthenticated: null,
    loading: true,
    error: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState)
  //  load user
  const loadUser = async () => {
    if (localStorage.credentials) {
      setAuthToken(localStorage.credentials)
      dispatch({
        type: USER_LOADED,
        payload: { credentials: localStorage.credentials, user: localStorage.user}
      })
    } else {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // register user
  const register = async formData => {
    try {
      const res = await api.post('/sign_up', formData)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })

      loadUser()
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data
      })
    }
  }


  const login = async formData => {
    try {
      const res = await api.post('/sign_in', formData)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })

      loadUser()
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data
      })
    }
  }

  // logout
  const logout = () => dispatch({ type: LOGOUT })

  // clear errors,
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

  return (
    <AuthContext.Provider
      value={{
        credentials: state.credentials,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
