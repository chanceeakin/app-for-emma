// @flow
import {
  SIGNUP_USERNAME_CHANGE,
  SIGNUP_PASSWORD_CHANGE,
  SIGNUP_EMAIL_CHANGE,
  SIGNUP_SEND_BEGIN,
  SIGNUP_SEND_SUCCESS,
  SIGNUP_SEND_FAIL
} from './../constants/action-types'
import {mainPage} from './navigation'
import type {SignupAction} from './signup.js.flow'
import type {Dispatch} from './../types/Store'

export const updateUserNameText = (payload: string): SignupAction => ({
  type: SIGNUP_USERNAME_CHANGE,
  payload
})

export const updatePasswordText = (payload: string): SignupAction => ({
  type: SIGNUP_PASSWORD_CHANGE,
  payload
})

export const updateEmailText = (payload: string): SignupAction => ({
  type: SIGNUP_EMAIL_CHANGE,
  payload
})

export const signupUser = (payload: Object): SignupAction => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: SIGNUP_SEND_BEGIN
    })

    try {
      const call = await fetch('http://192.168.0.7:8080/user', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: payload.username,
          Email: payload.email,
          Password: payload.password
        })
      })
      const json = await call.json()
      dispatch(signupSuccess(json))
    } catch (e) {
      dispatch(signupFail(e))
    }
  }
}

const signupSuccess = (payload) => (dispatch: Dispatch) => {
  dispatch(mainPage())
  dispatch({
    type: SIGNUP_SEND_SUCCESS,
    payload
  })
}

export const signupFail = () => (dispatch: Dispatch) => {
  dispatch({
    type: SIGNUP_SEND_FAIL
  })
}
