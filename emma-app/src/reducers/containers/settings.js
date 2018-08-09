// @ flow
import {
  EMAIL_CHANGE_PATCH_BEGIN,
  EMAIL_CHANGE_PATCH_SUCCESS,
  EMAIL_CHANGE_PATCH_FAIL,
  SETTINGS_PASSWORD_TEXT_UPDATE,
  SETTINGS_EMAIL_TEXT_UPDATE
} from '../../constants/action-types'
import type { Action } from './../../types/Action'
import type { Store } from './../../types/Store.js.flow'

type State = {
  isPatchingEmail: boolean,
  isPatchingEmailError: boolean,
  updatedEmail: string,
  updatedPassword: string
};

const initialState: State = {
  isPatchingEmail: false,
  isPatchingEmailError: false,
  updatedEmail: '',
  updatedPassword: ''
}

const loginReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
  case EMAIL_CHANGE_PATCH_BEGIN:
    return {
      ...state,
      isPatchingEmail: true,
      isPatchingEmailError: false
    }
  case EMAIL_CHANGE_PATCH_SUCCESS:
    return {
      ...state,
      isPatchingEmail: false,
      isPatchingEmailError: false
    }
  case EMAIL_CHANGE_PATCH_FAIL:
    console.log(action.payload)
    return {
      ...state,
      isPatchingEmail: false,
      isPatchingEmailError: true
    }
  case SETTINGS_EMAIL_TEXT_UPDATE:
    return {
      ...state,
      updatedEmail: action.payload
    }
  case SETTINGS_PASSWORD_TEXT_UPDATE:
    return {
      ...state,
      updatedPassword: action.payload
    }
  default:
    return state
  }
}

export default loginReducer

export function isPatchingEmail(state: Store): boolean {
  return state.containers.settings.isPatchingEmail
}

export function isPatchingEmailErrorSelector(state: Store): boolean {
  return state.containers.settings.isPatchingEmailError
}

export function updatedEmailSelector(state: Store): string {
  return state.containers.settings.updatedEmail
}

export function updatedPasswordSelector(state: Store): string {
  return state.containers.settings.updatedPassword
}
