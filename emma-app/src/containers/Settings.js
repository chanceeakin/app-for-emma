// @flow
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import type { Suggestion } from './../types/Suggestions.js.flow'
import { fetchSuggestions } from './../actions/main'
import { logout } from './../actions/settings'
import colors from './../constants/colors'
import type { MainAction } from './../actions/main.js.flow'
import type { SettingsAction } from './../actions/settings.js.flow'
import GradientWrapper from './../components/backgroundWrapper'

const mapStateToProps = state => ({
  suggestions: state.suggestions.suggestions
})

const mapDispatchToProps = {
  fetchSuggestions,
  logout
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    margin: 10
  },
  font: {
    fontFamily: 'Skia'
  },
  title: {
    flex: 1,
    fontSize: 72,
    textAlign: 'center',
    color: colors.inkBlue
  },
  description: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.darkPurple
  },
  row: {
    minHeight: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  bigNumber: {
    fontSize: 48
  },
  backButton: {
    padding: 5,
    paddingBottom: 15
  }
})

type Props = {
  suggestions: Suggestion[],
  fetchSuggestions: MainAction,
  logout: SettingsAction
};

class MainView extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  goBack = () => {
    this.props.navigation.goBack()
  };

  handleLogout = () => {
    this.props.logout()
  };

  render() {
    return (
      <GradientWrapper style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.title, styles.font]}>Settings</Text>
        </View>
        <TouchableOpacity onPress={this.handleLogout} style={styles.backButton}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goBack} style={styles.backButton}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </GradientWrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
