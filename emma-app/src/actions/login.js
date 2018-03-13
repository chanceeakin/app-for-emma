// @flow
import {
  LOGIN_USERNAME_CHANGE,
  LOGIN_PASSWORD_CHANGE
} from './../constants/action-types'
import type { LoginAction } from './login.js.flow'

export const updateUserNameText = (payload: string): LoginAction => ({
  type: LOGIN_USERNAME_CHANGE,
  payload
})

export const updatePasswordText = (payload:string): LoginAction => ({
  type: LOGIN_PASSWORD_CHANGE,
  payload
})
