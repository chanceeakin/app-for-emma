import { combineReducers } from 'redux'
import login from './login'
import NavigationReducer from './navigation'

const AppReducer = combineReducers({
  NavigationReducer,
  login
})

export default AppReducer
