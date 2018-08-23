// @flow
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import {
  colors,
  button,
  modal as modalStyle,
  pageLayout,
  forms
} from './../styles'
import { connect } from 'react-redux'
import GradientWrapper from './../components/backgroundWrapper'

import { loginPage } from './../actions/navigation'

const mapStateToProps = state => ({
  isFontLoaded: state.app.isFontLoaded
})

const mapDispatchToProps = {
  loginPage
}

const { container } = pageLayout
const { bigButton, bigButtonText } = button

const styles = StyleSheet.create({
  container,
  font: {
    fontFamily: 'Skia'
  },
  title: {
    fontSize: 72,
    textAlign: 'center',
    color: colors.inkBlue
  },
  text: {
    fontSize: 72,
    color: '#C5CC08',
    textAlign: 'center',
    fontFamily: 'Skia'
  },
  bigNumber: {
    fontSize: 48
  },
  bigButton,
  bigButtonText
})

type Props = {};

class AboutView extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  goBack = () => {
    this.props.navigation.goBack()
  };

  render() {
    return (
      <GradientWrapper style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.title, styles.font]}>About</Text>
        </View>
        <TouchableOpacity onPress={this.goBack} style={styles.settingsButton}>
          <Text style={styles.settingsText}>Back</Text>
        </TouchableOpacity>
      </GradientWrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutView)
