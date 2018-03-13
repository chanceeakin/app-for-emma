// @ flow
import {
  LOGIN_PASSWORD_CHANGE,
  LOGIN_USERNAME_CHANGE
} from '../constants/action-types'
import type { Action } from './../types/Action'

type State = {
  username: string,
  password: string
}

const initialState: State = {
  username: '',
  password: ''
}

const loginReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
  case LOGIN_USERNAME_CHANGE:
    return {
      ...state,
      username: action.payload
    }
  case LOGIN_PASSWORD_CHANGE:
    return {
      ...state,
      password: action.payload
    }
  default:
    return state
  }
}

export default loginReducer
