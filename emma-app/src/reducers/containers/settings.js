// @ flow
import {
  EMAIL_CHANGE_FETCH_BEGIN,
  EMAIL_CHANGE_FETCH_SUCCESS,
  EMAIL_CHANGE_FETCH_FAIL
} from '../../constants/action-types'
import type { Action } from './../../types/Action'
import type { Store } from './../../types/Store.js.flow'

type State = {
  isPatchingEmail: boolean
};

const initialState: State = {
  isPatchingEmail: false,
  isPatchingEmailError: false
}

const loginReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
  case EMAIL_CHANGE_FETCH_BEGIN:
    return {
      ...state,
      isPatchingEmail: true,
      isPatchingEmailError: false
    }
  case EMAIL_CHANGE_FETCH_SUCCESS:
    return {
      ...state,
      isPatchingEmail: false,
      isPatchingEmailError: false
    }
  case EMAIL_CHANGE_FETCH_FAIL:
    return {
      ...state,
      isPatchingEmail: false,
      isPatchingEmailError: true
    }
  default:
    return state
  }
}

export default loginReducer

export function isPatchingEmail(state: Store): boolean {
  return state.containers.settings.isPatchingEmail
}

export function isPatchingEmailError(state: Store): boolean {
  return state.containers.settings.isPatchingEmailError
}
