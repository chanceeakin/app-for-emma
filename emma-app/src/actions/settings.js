import {
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  EMAIL_CHANGE_FETCH_BEGIN,
  EMAIL_CHANGE_FETCH_SUCCESS,
  EMAIL_CHANGE_FETCH_FAIL
} from './../constants/action-types'
import type { ChangeEmailPayload, SettingsAction } from './settings.js.flow'
import { loginPage } from './navigation'
import { apiUrl } from './../../config'
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
          'Content-Type': 'application/json'
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

export const changeEmail = (payload: ChangeEmailPayload) => {
  return async dispatch => {
    dispatch({
      type: EMAIL_CHANGE_FETCH_BEGIN
    })
    try {
      const call = await fetch(`${apiUrl}/iphone-email-update`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: {
          id: payload.id,
          email: payload.email
        }
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
    type: EMAIL_CHANGE_FETCH_SUCCESS,
    payload
  }
}

const emailChangeFail = (payload: Error): SettingsAction => ({
  type: EMAIL_CHANGE_FETCH_FAIL,
  payload
})
