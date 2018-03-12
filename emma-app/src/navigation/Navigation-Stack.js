import { StackNavigator } from 'react-navigation'
import Login from '../containers/Login'
import Main from '../containers/Main'
import Signup from '../containers/Signup'

const navigator = StackNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  Main: {
    screen: Main
  }
},{headerMode: 'screen'})

export default navigator
