import React, { useReducer } from 'react'

import api from '../../utils/api'
import RegisterContext from './registerContext'
import registerReducer from './registerReducer'

import * as types from '../types'

const URL_ROUTE = '/registries'

const RegisterState = props => {
  const initialState = {
    registers: null,
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(registerReducer, initialState)

  const getRegisters = async () => {
    try {
      const res = await api.get(URL_ROUTE)
      dispatch({
        type: types.GET_REGISTERS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: types.REGISTER_ERROR,
        payload: err.response.data
      })
    }
  }

  const addRegister = async register => {
    try {
      const res = await api.post(URL_ROUTE, register)

      dispatch({
        type: types.ADD_REGISTER,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: types.REGISTER_ERROR,
        payload: err.response.data
      })
    }
  }

  const deleteRegister = async id => {
    try {
      await api.delete(`${URL_ROUTE}/${id}`)

      dispatch({
        type: types.DELETE_REGISTER,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: types.REGISTER_ERROR,
        payload: err.response.data
      })
    }
  }

  const updateRegister = async register => {
    try {
      const res = await api.put(
        `${URL_ROUTE}/${register.id}`,
        register
      )
      dispatch({
        type: types.UPDATE_REGISTER,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: types.REGISTER_ERROR,
        payload: err.response.data
      })
    }
  }

  const clearRegisters = () => {
    dispatch({ type: types.CLEAR_REGISTERS })
  }

  const setCurrent = list => {
    dispatch({ type: SET_CURRENT, payload: list })
  }

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  const filterRegisters = text => {
    dispatch({ type: types.FILTER_REGISTERS, payload: text })
  }

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <RegisterContext.Provider
      value={{
        registers: state.registers,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addRegister,
        deleteRegister,
        setCurrent,
        clearCurrent,
        updateRegister,
        filterRegisters,
        clearFilter,
        getRegisters,
        clearRegisters
      }}
    >
      {props.children}
    </RegisterContext.Provider>
  )
}

export default RegisterState
