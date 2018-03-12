// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {Font} from 'expo'

import store from './src/store.js' //Import the store
import AppNavigation from './src/navigation'
import Skia from './assets/fonts/Skia-Regular.ttf'

import {
  loadFonts
} from './src/actions/app'

type Props = {

}

export default class App extends Component<Props> {

  async componentDidMount () {
    await  Font.loadAsync({
      'Skia': Skia,
    })
    store.dispatch(loadFonts())
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    )
  }
}
