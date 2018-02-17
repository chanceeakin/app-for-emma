// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './src/store.js' //Import the store
import AppNavigation from './src/navigation'

type Props = {

}

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    )
  }
}
