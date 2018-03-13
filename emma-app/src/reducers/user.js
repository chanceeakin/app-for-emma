// @flow
import {
  SIGNUP_SEND_SUCCESS
} from '../constants/action-types'
import type {Action} from './../types/Action.js.flow'

type State = {
  user: Object
}

const initialState: State = {
  user: {}
}

const loginReducer = (state: State = initialState, action: Action) => {
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
