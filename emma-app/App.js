// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Font } from 'expo'

import { store } from './src/store.js' //Import the store
import AppNavigation from './src/navigation'
import Skia from './assets/fonts/Skia-Regular.ttf'

import { loadFonts } from './src/actions/app'
import styles from './src/styles'

type Props = {};

export default class App extends Component<Props> {
  fontLoad = async () => {
    await Font.loadAsync({
      Skia: Skia
    })
    store.dispatch(loadFonts())
  };

  componentDidMount() {
    this.fontLoad()
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    )
  }
}
