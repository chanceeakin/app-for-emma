// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AppLoading, Font } from 'expo'

import { store } from './src/store.js' //Import the store
import AppNavigation from './src/navigation'
import Skia from './assets/fonts/Skia-Regular.ttf'
import { loadFonts } from './src/actions/app'

type Props = {};

type State = {
  areReasourcesReady: boolean,
};

export default class App extends Component<Props, State> {
  state = { areReasourcesReady: false };

  fontLoad = async () => {
    try {
      await Font.loadAsync({
        Skia: Skia,
      })
      await this.setState({ areReasourcesReady: true })
      await store.dispatch(loadFonts())
    } catch (e) {
      throw e
    }
  };

  render() {
    const { areReasourcesReady } = this.state
    return (
      <Provider store={store}>
        {!areReasourcesReady ? (
          <AppLoading
            startAsync={this.fontLoad}
            onFinish={() => this.setState({ areReasourcesReady: true })}
            onError={console.warn}
          />
        ) : (
          <AppNavigation />
        )}
      </Provider>
    )
  }
}
