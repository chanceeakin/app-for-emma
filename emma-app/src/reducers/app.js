// @flow
import {
  APP_FONT_LOAD
} from '../constants/action-types'
import type {Action} from './../types/Action.js.flow'

type State = {
  isFontLoaded: boolean
}

const initialState: State = {
  isFontLoaded: false
}

const appReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
  case APP_FONT_LOAD:
    return {
      ...state,
      isFontLoaded: true
    }
  default:
    return state
  }
}

export default appReducer
