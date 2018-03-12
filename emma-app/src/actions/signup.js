import {
  SIGNUP_USERNAME_CHANGE,
  SIGNUP_PASSWORD_CHANGE,
  SIGNUP_EMAIL_CHANGE,
  SIGNUP_SEND_BEGIN,
  SIGNUP_SEND_SUCCESS,
  SIGNUP_SEND_FAIL
} from './../constants/action-types'
import {mainPage} from './navigation'

export const updateUserNameText = (payload) => ({
  type: SIGNUP_USERNAME_CHANGE,
  payload
})

export const updatePasswordText = (payload) => ({
  type: SIGNUP_PASSWORD_CHANGE,
  payload
})

export const updateEmailText = (payload) => ({
  type: SIGNUP_EMAIL_CHANGE,
  payload
})

export const signupUser = (payload) => {
  return async dispatch => {
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

const signupSuccess = (payload) => {
  return dispatch => {
    dispatch(mainPage())
    dispatch({
      type: SIGNUP_SEND_SUCCESS,
      payload
    })
  }
}

export const signupFail = () => {
  return dispatch => {
    dispatch({
      type: SIGNUP_SEND_FAIL
    })
  }
}
