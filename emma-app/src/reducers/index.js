// @ flow
import { combineReducers } from 'redux'
import login from './login'
import app from './app'
import signup from './signup'
import NavigationReducer from './navigation'


const reducers = {
  NavigationReducer,
  app,
  login,
  signup
}

export type Reducers = typeof reducers;

export default combineReducers(reducers)
