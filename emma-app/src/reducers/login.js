import {
  LOGIN_PASSWORD_CHANGE,
  LOGIN_USERNAME_CHANGE
} from '../constants/action-types'

const initialState = {
  username: '',
  password: ''
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_USERNAME_CHANGE:
    return {
      ...state,
      username: action.payload
    }
  case LOGIN_PASSWORD_CHANGE:
    return {
      ...state,
      password: action.payload
    }
  default:
    return state
  }
}

export default loginReducer
