// @flow
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { pageLayout, font, text, button, colors } from './../styles'
import { connect } from 'react-redux'
import GradientWrapper from './../components/wrappers/GradientWrapper'
import { fontLoadedSelector } from './../reducers/app'
import BackButton from './../components/primitives/BackButton'

import { loginPage } from './../actions/navigation'
import { fetchSuggestions } from './../actions/main'
import type { MainAction } from './../actions/main.js.flow'

const mapStateToProps = state => ({
  isFontLoaded: fontLoadedSelector(state),
})

const mapDispatchToProps = {
  loginPage,
  fetchSuggestions,
}

const { container, row } = pageLayout
const { bigButton, bigButtonText } = button
const { title } = text

const styles = StyleSheet.create({
  container: {
    ...container,
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  row,
  noPadRow: {
    ...row,
    minHeight: 0,
    flex: 0,
    padding: 20,
  },
  noFlexRow: {
    ...row,
    flex: 0,
  },
  font: font.skia,
  title: {
    ...title,
    fontSize: 40,
    padding: 0,
    margin: 0,
    color: colors.white,
  },
  mediumText: {
    fontSize: 36,
    padding: 10,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 18,
    padding: 8,
    textAlign: 'center',
  },
  bigButton: {
    ...bigButton,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  bigButtonText: {
    ...bigButtonText,
    fontSize: 18,
  },
})

type Props = {
  navigation: any,
  fetchSuggestions: MainAction,
  isFontLoaded: boolean,
};

class AboutView extends Component<Props> {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.slateBlue,
      height: 70,
    },
    headerTintColor: colors.white,
    headerTitle: <Text style={[styles.title, styles.font]}>About</Text>,
  };

  goBack = () => {
    this.props.navigation.goBack()
  };

  newSuggestion = () => {
    this.props.fetchSuggestions()
    this.goBack()
  };

  render() {
    return (
      <GradientWrapper style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.mediumText, styles.font]}>
            Once a day suggestions for simple improvements in your life.
          </Text>
        </View>
        <View style={styles.noFlexRow}>
          <Text style={[styles.smallText, styles.font]}>
            Don't like your current suggestion?
          </Text>
          <TouchableOpacity
            onPress={this.newSuggestion}
            style={styles.bigButton}
          >
            <Text style={[styles.bigButtonText, styles.font]}>
              Get a New One
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noPadRow}>
          <Text>Built with care by Chance Eakin</Text>
          <Text>© 2018</Text>
        </View>
      </GradientWrapper>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutView)
