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
    user: null,
    token: typeof window === 'undefined' ? null : localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState)
  //  load user
  const loadUser = async () => {
    setAuthToken(localStorage.token)

    try {
      const res = await api.get('/auth')
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (error) {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // register user
  const register = async formData => {
    try {
      console.log('formdata ', formData)
      const res = { data: '123456' }
      // const res = await api.post('/users/signup', formData)
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
      const res = await api.post('/auth/login', formData)
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
        token: state.token,
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
