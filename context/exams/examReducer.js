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

const examReducer = (state, action) => {
  switch (action.type) {
    case GET_EXAMS:
      return {
        ...state,
        exams: action.payload,
        loading: false
      }
    case ADD_EXAM:
      return {
        ...state,
        current: action.payload,
        // exams: [action.payload, ...state.exams],
        loading: false
      }
    case UPDATE_EXAM:
      return {
        ...state,
        exams: state.exams.map(exam =>
          exam.id === action.payload.id ? action.payload : exam
        ),
        loading: false
      }
    case DELETE_EXAM:
      return {
        ...state,
        exams: state.exams.filter(
          exam => exam.id !== action.payload
        ),
        loading: false
      }
    case CLEAR_EXAMS:
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
    case FILTER_EXAMS:
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
    case EXAM_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default examReducer