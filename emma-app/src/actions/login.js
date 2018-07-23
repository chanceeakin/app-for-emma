// @flow
import {
  LOGIN_USERNAME_CHANGE,
  LOGIN_PASSWORD_CHANGE,
  LOGIN_FETCH_BEGIN,
  LOGIN_FETCH_SUCCESS,
  LOGIN_FETCH_FAIL,
  LOGIN_ERROR_CLEAR
} from './../constants/action-types'
import { apiUrl } from './../../config'
import type {
  LoginAction,
  BeginLoginPayload,
  LoginSuccessPayload,
  LoginFailPayload
} from './login.js.flow'
import { mainPage } from './navigation'
import type { Dispatch } from './../types/Store'

export const updateUserNameText = (payload: string): LoginAction => ({
  type: LOGIN_USERNAME_CHANGE,
  payload
})

export const updatePasswordText = (payload: string): LoginAction => ({
  type: LOGIN_PASSWORD_CHANGE,
  payload
})

export const beginLogin = (payload: BeginLoginPayload): LoginAction => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: LOGIN_FETCH_BEGIN
    })
    try {
      const call = await fetch(`${apiUrl}/iphone-login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password
        })
      })
      const json = await call.json()
      if (json.status && json.status > 200) {
        throw json
      }
      dispatch(loginSuccess(json))
      dispatch(mainPage())
    } catch (e) {
      dispatch(loginFail(e))
      setTimeout(() => {
        dispatch(loginErrorClear())
      }, 4000)
    }
  }
}

export const loginSuccess = (payload: LoginSuccessPayload): LoginAction => ({
  type: LOGIN_FETCH_SUCCESS,
  payload
})

export const loginFail = (payload: LoginFailPayload): LoginAction => ({
  type: LOGIN_FETCH_FAIL,
  payload
})

export const loginErrorClear = (): LoginAction => ({
  type: LOGIN_ERROR_CLEAR
})
