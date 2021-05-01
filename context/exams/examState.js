import React, { useReducer } from 'react'

import api from '../../utils/api'
import ExamContext from './examContext'
import examReducer from './examReducer'

import {
  GET_EXAMS,
  ADD_EXAM,
  DELETE_EXAM,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_EXAM,
  FILTER_EXAMS,
  CLEAR_EXAMS,
  CLEAR_FILTER,
  EXAM_ERROR
} from '../types'

const URL_ROUTE = '/proofs'

const ExamState = props => {
  const initialState = {
    exams: null,
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(examReducer, initialState)

  const getExams = async () => {
    try {
      const res = await api.get(URL_ROUTE)
      dispatch({
        type: GET_EXAMS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: EXAM_ERROR,
        payload: err.response.data
      })
    }
  }

  const addExam = async exam => {
    try {
      const res = await api.post(URL_ROUTE, exam)

      dispatch({
        type: ADD_EXAM,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: EXAM_ERROR,
        payload: err.response.data
      })
    }
  }

  const deleteExam = async id => {
    try {
      await api.delete(`${URL_ROUTE}/${id}`)

      dispatch({
        type: DELETE_EXAM,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: EXAM_ERROR,
        payload: err.response.data
      })
    }
  }

  const updateExam = async exam => {
    try {
      const res = await api.put(
        `${URL_ROUTE}/${exam.id}`,
        exam
      )
      dispatch({
        type: UPDATE_EXAM,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: EXAM_ERROR,
        payload: err.response.data
      })
    }
  }

  const clearExams = () => {
    dispatch({ type: CLEAR_EXAMS })
  }

  const setCurrent = list => {
    dispatch({ type: SET_CURRENT, payload: list })
  }

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  const filterExams = text => {
    dispatch({ type: FILTER_EXAMS, payload: text })
  }

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <ExamContext.Provider
      value={{
        exams: state.exams,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addExam,
        deleteExam,
        setCurrent,
        clearCurrent,
        updateExam,
        filterExams,
        clearFilter,
        getExams,
        clearExams
      }}
    >
      {props.children}
    </ExamContext.Provider>
  )
}

export default ExamState
