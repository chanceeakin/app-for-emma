import {
  SIGNUP_USERNAME_CHANGE,
  SIGNUP_PASSWORD_CHANGE
} from './../constants/action-types'

export const updateUserNameText = (payload) => ({
  type: SIGNUP_USERNAME_CHANGE,
  payload
})

export const updatePasswordText = (payload) => ({
  type: SIGNUP_PASSWORD_CHANGE,
  payload
})
