import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import NavigationStack from './Navigation-Stack'

export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)

const App = reduxifyNavigator(NavigationStack, 'root')
const mapStateToProps = state => ({
  state: state.nav
})
const AppWithNavigationState = connect(mapStateToProps)(App)

export default AppWithNavigationState
