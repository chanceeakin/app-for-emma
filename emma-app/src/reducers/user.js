import {
  SIGNUP_SEND_SUCCESS
} from '../constants/action-types'

const initialState = {
  user: {}
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case SIGNUP_SEND_SUCCESS:
    return {
      ...state,
      user: action.payload
    }
  default:
    return state
  }
}

export default loginReducer
