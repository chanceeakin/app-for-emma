import {
  LOGIN_USERNAME_CHANGE,
  LOGIN_PASSWORD_CHANGE
} from './../constants/action-types'

export const updateUserNameText = (payload) => ({
  type: LOGIN_USERNAME_CHANGE,
  payload
})

export const updatePasswordText = (payload) => ({
  type: LOGIN_PASSWORD_CHANGE,
  payload
})
