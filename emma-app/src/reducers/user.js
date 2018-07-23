// @flow
import {
  SIGNUP_SEND_SUCCESS,
  LOGIN_FETCH_SUCCESS
} from '../constants/action-types'
import type { Action } from './../types/Action.js.flow'
import type { User } from './../types/User.js.flow'

type State = User;

const initialState: State = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  role: ''
}

const loginReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
  case SIGNUP_SEND_SUCCESS:
    return {
      ...state,
      user: action.payload
    }
  case LOGIN_FETCH_SUCCESS:
    return action.payload
  default:
    return state
  }
}

export default loginReducer
