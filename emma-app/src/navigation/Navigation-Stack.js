import { StackNavigator } from 'react-navigation'
import Login from '../containers/Login'
import Main from '../containers/Main'
import Signup from '../containers/Signup'
import Settings from '../containers/Settings'

const navigator = StackNavigator(
  {
    Login: {
      screen: Login
    },
    Signup: {
      screen: Signup
    },
    Main: {
      screen: Main
    },
    Settings: {
      screen: Settings
    }
  },
  { headerMode: 'screen' }
)

export default navigator
