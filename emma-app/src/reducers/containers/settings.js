// @ flow
import {
  EMAIL_CHANGE_PATCH_BEGIN,
  EMAIL_CHANGE_PATCH_SUCCESS,
  EMAIL_CHANGE_PATCH_FAIL,
  PASSWORD_CHANGE_PATCH_BEGIN,
  PASSWORD_CHANGE_PATCH_SUCCESS,
  PASSWORD_CHANGE_PATCH_FAIL,
  SETTINGS_OLD_PASSWORD_TEXT_UPDATE,
  SETTINGS_NEW_1_PASSWORD_TEXT_UPDATE,
  SETTINGS_NEW_2_PASSWORD_TEXT_UPDATE,
  SETTINGS_EMAIL_TEXT_UPDATE,
  PASSWORD_CHANGE_MODAL_TOGGLE,
  EMAIL_CHANGE_MODAL_TOGGLE
} from '../../constants/action-types'
import type { Action } from './../../types/Action'
import type { Store } from './../../types/Store.js.flow'

type State = {
  isPatchingEmail: boolean,
  isPatchingEmailError: boolean,
  updatedEmail: string,
  updatedPassword: string,
  isPasswordModalShown: boolean,
  isEmailModalShown: boolean
};

const initialState: State = {
  isPatchingEmail: false,
  isPatchingEmailError: false,
  isPatchingPassword: false,
  isPatchingPasswordError: false,
  updatedEmail: '',
  updatedOldPassword: '',
  updatedNewPassword1: '',
  updatedNewPassword2: '',
  isPasswordModalShown: false,
  isEmailModalShown: false
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
    return {
      ...state,
      isPatchingPassword: false,
      isPatchingPasswordError: true
    }
  case PASSWORD_CHANGE_PATCH_BEGIN:
    return {
      ...state,
      isPatchingPassword: true,
      isPatchingPasswordError: false
    }
  case PASSWORD_CHANGE_PATCH_SUCCESS:
    return {
      ...state,
      isPatchingPassword: false,
      isPatchingPasswordError: false
    }
  case PASSWORD_CHANGE_PATCH_FAIL:
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
  case SETTINGS_OLD_PASSWORD_TEXT_UPDATE:
    return {
      ...state,
      updatedOldPassword: action.payload
    }
  case SETTINGS_NEW_1_PASSWORD_TEXT_UPDATE:
    return {
      ...state,
      updatedNewPassword1: action.payload
    }
  case SETTINGS_NEW_2_PASSWORD_TEXT_UPDATE:
    return {
      ...state,
      updatedNewPassword2: action.payload
    }
  case PASSWORD_CHANGE_MODAL_TOGGLE:
    return {
      ...state,
      isPasswordModalShown: !state.isPasswordModalShown
    }
  case EMAIL_CHANGE_MODAL_TOGGLE:
    return {
      ...state,
      isEmailModalShown: !state.isEmailModalShown
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

export function updatedOldPasswordSelector(state: Store): string {
  return state.containers.settings.updatedOldPassword
}

export function updatedNewPassword1Selector(state: Store): string {
  return state.containers.settings.updatedNewPassword1
}

export function updatedNewPassword2Selector(state: Store): string {
  return state.containers.settings.updatedNewPassword2
}

export function emailModalSelector(state: Store): boolean {
  return state.containers.settings.isEmailModalShown
}

export function passwordModalSelector(state: Store): boolean {
  return state.containers.settings.isPasswordModalShown
}
