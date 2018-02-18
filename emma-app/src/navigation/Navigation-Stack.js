import { StackNavigator } from 'react-navigation'
import Splash from '../containers/Splash'
import Login from '../containers/Login'
import Main from '../containers/Main'
import Signup from '../containers/Signup'

const navigator = StackNavigator({
  Splash: {
    screen: Splash
  },
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
