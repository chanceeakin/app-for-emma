import { combineReducers } from 'redux'
import login from './login'
import signup from './signup'
import settings from './settings'

const containers = {
  login,
  signup,
  settings
}

export default combineReducers(containers)
