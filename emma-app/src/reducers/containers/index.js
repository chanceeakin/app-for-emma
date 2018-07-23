import { combineReducers } from 'redux'
import login from './login'
import signup from './signup'

const containers = {
  login,
  signup
}

export default combineReducers(containers)
