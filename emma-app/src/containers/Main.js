// @flow
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import type { Suggestion } from './../types/Suggestions.js.flow'
import { fetchSuggestions } from './../actions/main'
import { getSuggestions } from './../reducers/suggestions'
import {colors} from './../styles'
import type { MainAction } from './../actions/main.js.flow'
import { settingsPage } from './../actions/navigation'
import GradientWrapper from './../components/backgroundWrapper'

const mapStateToProps = state => ({
  suggestions: getSuggestions(state)
})

const mapDispatchToProps = {
  fetchSuggestions,
  settingsPage
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  row: {
    flex: 1,
    minHeight: 100,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    margin: 10
  },
  font: {
    fontFamily: 'Skia'
  },
  title: {
    fontSize: 72,
    textAlign: 'center',
    color: colors.inkBlue
  },
  description: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.darkPurple
  },
  bigNumber: {
    fontSize: 48
  },
  settingsButton: {
    padding: 5,
    alignItems: 'flex-start',
    paddingBottom: 15
  },
  settingsText: {
    color: colors.inkBlue
  }
})

type Props = {
  suggestions: Suggestion,
  fetchSuggestions: MainAction,
  settingsPage: Function
};

class MainView extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.fetchSuggestions()
  }

  render() {
    return (
      <GradientWrapper style={styles.container}>
        <View style={styles.row}>
          {this.props.suggestions.title ? (
            <Text style={[styles.title, styles.font]}>
              {this.props.suggestions.title}
            </Text>
          ) : null}
          {this.props.suggestions.description ? (
            <Text style={[styles.description, styles.font]}>
              {this.props.suggestions.description}
            </Text>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={this.props.settingsPage}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </GradientWrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
