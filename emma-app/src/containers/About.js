// @flow
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { pageLayout, font, text } from './../styles'
import { connect } from 'react-redux'
import GradientWrapper from './../components/wrappers/GradientWrapper'
import { fontLoadedSelector } from './../reducers/app'
import BackButton from './../components/primitives/BackButton'

import { loginPage } from './../actions/navigation'

const mapStateToProps = state => ({
  isFontLoaded: fontLoadedSelector(state),
})

const mapDispatchToProps = {
  loginPage,
}

const { container, row } = pageLayout
const { title } = text

const styles = StyleSheet.create({
  container,
  row,
  font: font.skia,
  title,
})

type Props = {
  navigation: any,
};

class AboutView extends Component<Props> {
  static navigationOptions = {
    header: null,
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
        <BackButton onPress={this.goBack} title={'Back'} />
      </GradientWrapper>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutView)
