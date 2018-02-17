import AppNavigator from '../navigation/Navigation-Stack'
const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Splash')
)
const navigationReducer = (state = initialState, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state)
  return newState || state
}

export default navigationReducer
