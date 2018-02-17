import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import NavigationStack from './Navigation-Stack'
import {addListener} from './../utils/redux'

class AppNavigation extends Component {
  render() {
    const { navigationState, dispatch } = this.props
    return (
      <NavigationStack
        navigation={addNavigationHelpers({
          dispatch,
          state: navigationState,
          addListener
        })}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    navigationState: state.NavigationReducer
  }
}

export default connect(mapStateToProps)(AppNavigation)
