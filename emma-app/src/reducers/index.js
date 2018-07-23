// @ flow
import { combineReducers } from 'redux'
import app from './app'
import containers from './containers'
import NavigationReducer from './navigation'
import user from './user'
import suggestions from './suggestions'

const reducers = {
  NavigationReducer,
  app,
  containers,
  suggestions,
  user
}

export type Reducers = typeof reducers;

export default combineReducers(reducers)
