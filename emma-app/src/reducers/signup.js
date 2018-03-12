import {
  SIGNUP_PASSWORD_CHANGE,
  SIGNUP_USERNAME_CHANGE,
  SIGNUP_EMAIL_CHANGE,
  SIGNUP_SEND_BEGIN,
  SIGNUP_SEND_FAIL,
  SIGNUP_SEND_SUCCESS
} from '../constants/action-types'

const initialState = {
  username: '',
  password: '',
  email: '',
  isSendingSignup: false,
  signupError: false
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
  case SIGNUP_EMAIL_CHANGE:
    return {
      ...state,
      email: action.payload
    }
  case SIGNUP_SEND_BEGIN:
    return {
      ...state,
      isSendingSignup: true,
      signupError: false,
      username: '',
      email: '',
      password: ''
    }
  case SIGNUP_SEND_SUCCESS:
    return {
      ...state,
      isSendingSignup: false
    }
  case SIGNUP_SEND_FAIL:
    return {
      ...state,
      isSendingSignup: false,
      signupError: true
    }
  default:
    return state
  }
}

export default signupReducer
