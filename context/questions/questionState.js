import React, { useReducer } from 'react'

import api from '../../utils/api'
import QuestionContext from './questionContext'
import questionReducer from './questionReducer'

import {
  GET_QUESTIONS,
  ADD_QUESTION,
  DELETE_QUESTION,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_QUESTION,
  FILTER_QUESTIONS,
  CLEAR_QUESTIONS,
  CLEAR_FILTER
} from '../types'

const URL_ROUTE = '/proofs'

const QuestionState = props => {
  const initialState = {
    question: null,
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(questionReducer, initialState)

  const getQuestions = async () => {
    try {
      const res = await api.get(URL_ROUTE)
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: QUESTION_ERROR,
        payload: err.response.data
      })
    }
  }

  const addQuestion = async qustion => {
    try {
      const res = await api.post(URL_ROUTE, qustion)

      dispatch({
        type: ADD_QUESTION,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: QUESTION_ERROR,
        payload: err.response.data
      })
    }
  }

  const deleteQuestion = async id => {
    try {
      await api.delete(`${URL_ROUTE}/${id}`)

      dispatch({
        type: DELETE_QUESTION,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: QUESTION_ERROR,
        payload: err.response.data
      })
    }
  }

  const updateQuestion = async question => {
    try {
      const res = await api.put(
        `${URL_ROUTE}/${question.id}`,
        question
      )
      dispatch({
        type: UPDATE_QUESTION,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: QUESTION_ERROR,
        payload: err.response.data
      })
    }
  }

  const clearQuestions = () => {
    dispatch({ type: CLEAR_QUESTIONS })
  }

  const setCurrent = list => {
    dispatch({ type: SET_CURRENT, payload: list })
  }

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  const filterQuestions = text => {
    dispatch({ type: FILTER_QUESTIONS, payload: text })
  }

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <QuestionContext.Provider
      value={{
        questions: state.questions,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addQuestion,
        deleteQuestion,
        setCurrent,
        clearCurrent,
        updateQuestion,
        filterQuestions,
        clearFilter,
        getQuestions,
        clearQuestions
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  )
}

export default QuestionState
