import { combineReducers } from 'redux'
import login from './login'
import signup from './signup'
import NavigationReducer from './navigation'

const AppReducer = combineReducers({
  NavigationReducer,
  login,
  signup
})

export default AppReducer
