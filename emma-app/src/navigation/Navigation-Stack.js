import { createStackNavigator } from 'react-navigation'
// import Login from '../containers/Login'
import Main from '../containers/Main'
// import Signup from '../containers/Signup'
import About from '../containers/About'
// import Settings from '../containers/Settings'

const navigator = createStackNavigator(
  {
    // Login: {
    //   screen: Login
    // },
    // Signup: {
    //   screen: Signup
    // },
    Main: {
      screen: Main
    },
    About: {
      screen: About
    }
    // Settings: {
    //   screen: Settings
    // }
  },
  { headerMode: 'screen' }
)

export default navigator
