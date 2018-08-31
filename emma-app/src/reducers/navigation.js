import { createNavigationReducer } from 'react-navigation-redux-helpers'
import AppNavigator from '../navigation/NavigationStack'

const navReducer = createNavigationReducer(AppNavigator)

export default navReducer
