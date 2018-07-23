// @ flow
import {
  LOGIN_PASSWORD_CHANGE,
  LOGIN_USERNAME_CHANGE,
  LOGIN_FETCH_BEGIN,
  LOGIN_FETCH_SUCCESS,
  LOGIN_FETCH_FAIL,
  LOGIN_ERROR_CLEAR
} from '../../constants/action-types'
import type { Action } from './../../types/Action'

type State = {
  email: string,
  password: string,
  isLoggingIn: boolean,
  loginError: boolean
};

const initialState: State = {
  email: '',
  password: '',
  isLoggingIn: false,
  isLoginError: false,
  errorMessage: ''
}

const loginReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
  case LOGIN_USERNAME_CHANGE:
    return {
      ...state,
      email: action.payload,
      isLoginError: false
    }
  case LOGIN_PASSWORD_CHANGE:
    return {
      ...state,
      password: action.payload,
      isLoginError: false
    }
  case LOGIN_FETCH_BEGIN:
    return {
      ...state,
      isLoggingIn: true,
      isLoginError: false,
      email: '',
      password: ''
    }
  case LOGIN_FETCH_SUCCESS:
    return {
      ...state,
      isLoggingIn: false,
      isLoginError: false
    }
  case LOGIN_FETCH_FAIL:
    return {
      ...state,
      isLoggingIn: false,
      isLoginError: true,
      errorMessage: action.payload.message
    }
  case LOGIN_ERROR_CLEAR:
    return {
      ...state,
      isLoggingIn: false,
      isLoginError: false,
      errorMessage: ''
    }
  default:
    return state
  }
}

export default loginReducer
