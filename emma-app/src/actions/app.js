// @flow
import {
  APP_FONT_LOAD
} from './../constants/action-types'
import type {AppAction} from './app.js.flow'

export const loadFonts = (): AppAction => ({
  type: APP_FONT_LOAD
})
