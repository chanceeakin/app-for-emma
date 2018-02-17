import { StackNavigator } from 'react-navigation'
import Splash from '../containers/Splash'
import Login from '../containers/Login'
import Main from '../containers/Main'

const navigator = StackNavigator({
  Splash: {
    screen: Splash
  },
  Login: {
    screen: Login
  },
  Main: {
    screen: Main
  }
},{headerMode: 'screen'})

export default navigator
