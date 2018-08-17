import {
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  EMAIL_CHANGE_PATCH_BEGIN,
  EMAIL_CHANGE_PATCH_SUCCESS,
  EMAIL_CHANGE_PATCH_FAIL,
  SETTINGS_EMAIL_TEXT_UPDATE,
  SETTINGS_OLD_PASSWORD_TEXT_UPDATE,
  SETTINGS_NEW_1_PASSWORD_TEXT_UPDATE,
  SETTINGS_NEW_2_PASSWORD_TEXT_UPDATE,
  PASSWORD_CHANGE_PATCH_FAIL,
  PASSWORD_CHANGE_PATCH_BEGIN,
  PASSWORD_CHANGE_PATCH_SUCCESS,
  EMAIL_CHANGE_MODAL_TOGGLE,
  PASSWORD_CHANGE_MODAL_TOGGLE
} from './../constants/action-types'
import type { SettingsAction } from './settings.js.flow'
import { loginPage } from './navigation'
import { apiUrl } from './../../config'
import { retrieveSession } from './../utils/asyncStorage'
import type { ServerSuccess } from './../types/Globals.js.flow'

export const logout = (): SettingsAction => {
  return async dispatch => {
    dispatch({
      type: LOGOUT_BEGIN
    })
    try {
      const call = await fetch(`${apiUrl}/iphone-logout`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: retrieveSession()
        }
      })
      const json = await call.json()
      if (json.status && json.status > 200) {
        throw json
      }
      dispatch(logoutSuccess(json))
      dispatch(loginPage())
    } catch (e) {
      dispatch(logoutFail(e))
    }
  }
}

const logoutSuccess = (payload: Object): SettingsAction => {
  return {
    type: LOGOUT_SUCCESS,
    payload
  }
}

const logoutFail = (payload: Error): SettingsAction => ({
  type: LOGOUT_FAIL,
  payload
})

export const changeEmail = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: EMAIL_CHANGE_PATCH_BEGIN
    })
    const id = getState().user.id
    const email = getState().containers.settings.updatedEmail
    try {
      const call = await fetch(`${apiUrl}/iphone-email-update`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          email
        })
      })
      const json = await call.json()
      if (json.status && json.status > 200) {
        throw json
      }
      dispatch(emailChangeSuccess(json))
    } catch (e) {
      dispatch(emailChangeFail(e))
    }
  }
}

const emailChangeSuccess = (payload: ServerSuccess): SettingsAction => {
  return {
    type: EMAIL_CHANGE_PATCH_SUCCESS,
    payload
  }
}

const emailChangeFail = (payload: Error): SettingsAction => ({
  type: EMAIL_CHANGE_PATCH_FAIL,
  payload
})

export const updateEmailPatchTextField = (payload: string): SettingsAction => ({
  type: SETTINGS_EMAIL_TEXT_UPDATE,
  payload
})

export const updateOldPasswordPatchTextField = (
  payload: string
): SettingsAction => ({
  type: SETTINGS_OLD_PASSWORD_TEXT_UPDATE,
  payload
})

export const updateNewPassword1PatchTextField = (
  payload: string
): SettingsAction => ({
  type: SETTINGS_NEW_1_PASSWORD_TEXT_UPDATE,
  payload
})

export const updateNewPassword2PatchTextField = (
  payload: string
): SettingsAction => ({
  type: SETTINGS_NEW_2_PASSWORD_TEXT_UPDATE,
  payload
})

export const changePassword = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: PASSWORD_CHANGE_PATCH_BEGIN
    })
    const id = getState().user.id
    const oldPassword = getState().containers.settings.oldPassword
    const newPassword1 = getState().containers.settings.newPassword1
    const newPassword2 = getState().containers.settings.newPassword2
    try {
      if (newPassword1 !== newPassword2) {
        throw Error('Passwords mismatch')
      }
      const newPassword = newPassword2
      const call = await fetch(`${apiUrl}/iphone-password-update`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          oldPassword,
          newPassword
        })
      })
      const json = await call.json()
      if (json.status && json.status > 200) {
        throw json
      }
      dispatch(passwordChangeSuccess(json))
    } catch (e) {
      dispatch(passwordChangeFail(e))
    }
  }
}

const passwordChangeSuccess = (payload: ServerSuccess): SettingsAction => {
  return {
    type: PASSWORD_CHANGE_PATCH_SUCCESS,
    payload
  }
}

const passwordChangeFail = (payload: Error): SettingsAction => ({
  type: PASSWORD_CHANGE_PATCH_FAIL,
  payload
})

export const togglePasswordModal = (): SettingsAction => ({
  type: PASSWORD_CHANGE_MODAL_TOGGLE
})

export const toggleEmailModal = (): SettingsAction => ({
  type: EMAIL_CHANGE_MODAL_TOGGLE
})
