import {
  GET_QUESTIONS,
  ADD_QUESTION,
  DELETE_QUESTION,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_QUESTION,
  FILTER_QUESTIONS,
  CLEAR_QUESTIONS,
  CLEAR_FILTER,
  QUESTION_ERROR
} from '../types'

const questionReducer = (state, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        exams: action.payload,
        loading: false
      }
    case ADD_QUESTION:
      return {
        ...state,
        current: action.payload,
        // exams: [action.payload, ...state.exams],
        loading: false
      }
    case UPDATE_QUESTION:
      return {
        ...state,
        exams: state.exams.map(exam =>
          exam.id === action.payload.id ? action.payload : exam
        ),
        loading: false
      }
    case DELETE_QUESTION:
      return {
        ...state,
        exams: state.exams.filter(
          exam => exam.id !== action.payload
        ),
        loading: false
      }
    case CLEAR_QUESTIONS:
      return {
        ...state,
        exams: null,
        filtered: null,
        error: null,
        current: null
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case FILTER_QUESTIONS:
      return {
        ...state,
        filtered: state.exams.filter(exam => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return exam.name.match(regex) || exam.email.match(regex)
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case QUESTION_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default questionReducer