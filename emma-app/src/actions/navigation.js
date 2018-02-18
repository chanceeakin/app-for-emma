import {NavigationActions} from 'react-navigation'

export const loginPage = () => {
  return dispatch => {
    dispatch(NavigationActions.navigate({
      routeName: 'Login'
    })
    )
  }
}

export const mainPage = () => {
  return dispatch => {
    dispatch(NavigationActions.navigate({
      routeName: 'Main'
    })
    )
  }
}

export const signupPage = () => {
  return dispatch => {
    dispatch(NavigationActions.navigate({
      routeName: 'Signup'
    })
    )
  }
}
