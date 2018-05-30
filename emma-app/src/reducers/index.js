// @ flow
import { combineReducers } from 'redux'
import login from './login'
import app from './app'
import signup from './signup'
import NavigationReducer from './navigation'
import suggestions from './suggestions'


const reducers = {
  NavigationReducer,
  app,
  login,
  signup,
  suggestions
}

export type Reducers = typeof reducers;

export default combineReducers(reducers)
