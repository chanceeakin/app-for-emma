import { createNavigationReducer } from 'react-navigation-redux-helpers'
import AppNavigator from '../navigation/Navigation-Stack'

const navReducer = createNavigationReducer(AppNavigator)

export default navReducer
