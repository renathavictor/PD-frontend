import * as types from '../types'

const registerReducer = (state, action) => {
  switch (action.type) {
    case types.GET_REGISTERS:
      return {
        ...state,
        registers: action.payload,
        loading: false
      }
    case types.ADD_REGISTER:
      return {
        ...state,
        current: action.payload,
        loading: false
      }
    case types.UPDATE_REGISTER:
      return {
        ...state,
        registers: state.registers.map(register =>
          register.id === action.payload.id ? action.payload : register
        ),
        loading: false
      }
    case types.DELETE_REGISTER:
      return {
        ...state,
        registers: state.registers.filter(
          register => register.id !== action.payload
        ),
        loading: false
      }
    case types.CLEAR_REGISTERS:
      return {
        ...state,
        registers: null,
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
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case types.REGISTER_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default registerReducer