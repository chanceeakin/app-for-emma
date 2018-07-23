// @flow
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import type { Suggestion } from './../types/Suggestions.js.flow'
import { fetchSuggestions } from './../actions/main'
import colors from './../constants/colors'
import type { MainAction } from './../actions/main.js.flow'
import GradientWrapper from './../components/backgroundWrapper'

const mapStateToProps = state => ({
  suggestions: state.suggestions.suggestions
})

const mapDispatchToProps = {
  fetchSuggestions
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  fetchSuggestions: MainAction
};

class MainView extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <GradientWrapper style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.title, styles.font]}>Settings</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </GradientWrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
