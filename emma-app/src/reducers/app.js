import {
  APP_FONT_LOAD
} from '../constants/action-types'

const initialState = {
  isFontLoaded: false
}

const appReducer = (state = initialState, action) => {
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
