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
  EDITION_ERROR,
  GET_EDITION
} from '../types'

const editionReducer = (state, action) => {
  console.log('ACTION ', action)
  switch (action.type) {
    case GET_EDITIONS:
      return {
        ...state,
        editions: action.payload,
        loading: false
      }
    case ADD_EDITION:
      return {
        ...state,
        current: action.payload,
        // editions: [action.payload, ...state.editions],
        loading: false
      }
    case GET_EDITION:
      return {
        ...state,
        current: action.payload,
        loading: false
      }
    case UPDATE_EDITION:
      return {
        ...state,
        editions: state.editions.map(edition =>
          edition.id === action.payload.id ? action.payload : edition
        ),
        loading: false
      }
    case DELETE_EDITION:
      return {
        ...state,
        editions: state.editions.filter(
          list => list.id !== action.payload
        ),
        loading: false
      }
    case CLEAR_EDITIONS:
      return {
        ...state,
        editions: null,
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
    case FILTER_EDITIONS:
      return {
        ...state,
        filtered: state.editions.filter(edition => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return edition.name.match(regex) || edition.email.match(regex)
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case EDITION_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default editionReducer