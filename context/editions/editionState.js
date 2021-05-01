import React, { useReducer } from 'react'

import api from '../../utils/api'
import EditionContext from './editionContext'
import editionReducer from './editionReducer'

import {
  GET_EDITIONS,
  ADD_EDITION,
  DELETE_EDITION,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_EDITION,
  FILTER_EDITIONS,
  CLEAR_EDITIONS,
  CLEAR_FILTER,
  EDITION_ERROR
} from '../types'

const URL_ROUTE = '/editions'

const EditionState = props => {
  const initialState = {
    editions: null,
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(editionReducer, initialState)

  const getEditions = async () => {
    try {
      const res = await api.get(URL_ROUTE)
      dispatch({
        type: GET_EDITIONS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: EDITION_ERROR,
        payload: err.response.data
      })
    }
  }

  const addEdition = async edition => {
    try {
      const res = await api.post(URL_ROUTE, edition)

      dispatch({
        type: ADD_EDITION,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: EDITION_ERROR,
        payload: err.response.data
      })
    }
  }

  const deleteEdition = async id => {
    try {
      await api.delete(`${URL_ROUTE}/${id}`)

      dispatch({
        type: DELETE_EDITION,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: EDITION_ERROR,
        payload: err.response.data
      })
    }
  }

  const updateEdition = async edition => {
    try {
      const res = await api.put(
        `${URL_ROUTE}/${edition.id}`,
        edition
      )
      dispatch({
        type: UPDATE_EDITION,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: EDITION_ERROR,
        payload: err.response.data
      })
    }
  }

  const clearEditions = () => {
    dispatch({ type: CLEAR_EDITIONS })
  }

  const setCurrent = list => {
    dispatch({ type: SET_CURRENT, payload: list })
  }

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  const filterEditions = text => {
    dispatch({ type: FILTER_EDITIONS, payload: text })
  }

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <EditionContext.Provider
      value={{
        editions: state.editions,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addEdition,
        deleteEdition,
        setCurrent,
        clearCurrent,
        updateEdition,
        filterEditions,
        clearFilter,
        getEditions,
        clearEditions
      }}
    >
      {props.children}
    </EditionContext.Provider>
  )
}

export default EditionState
