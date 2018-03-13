// @flow
import {NavigationActions} from 'react-navigation'
import type {Dispatch} from './../types/Store'

export const loginPage = () => (dispatch: Dispatch) => {
  dispatch(NavigationActions.navigate({
    routeName: 'Login'
  })
  )
}

export const mainPage = () => (dispatch: Dispatch) => {
  dispatch(NavigationActions.navigate({
    routeName: 'Main'
  })
  )
}

export const signupPage = () => (dispatch: Dispatch) => {
  dispatch(NavigationActions.navigate({
    routeName: 'Signup'
  })
  )
}
