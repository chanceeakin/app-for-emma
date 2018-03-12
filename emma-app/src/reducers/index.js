import { combineReducers } from 'redux'
import login from './login'
import app from './app'
import signup from './signup'
import NavigationReducer from './navigation'

const AppReducer = combineReducers({
  NavigationReducer,
  app,
  login,
  signup
})

export default AppReducer
