import {
  SIGNUP_PASSWORD_CHANGE,
  SIGNUP_USERNAME_CHANGE
} from '../constants/action-types'

const initialState = {
  username: '',
  password: ''
}

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
  case SIGNUP_USERNAME_CHANGE:
    return {
      ...state,
      username: action.payload
    }
  case SIGNUP_PASSWORD_CHANGE:
    return {
      ...state,
      password: action.payload
    }
  default:
    return state
  }
}

export default signupReducer
