// @flow
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import type { Suggestion } from './../types/Suggestions.js.flow'
import { pageLayout } from './../styles'
import { checkSuggestionsTime } from './../actions/main'
import { getSuggestions } from './../reducers/suggestions'
import type { MainAction } from './../actions/main.js.flow'
import { aboutPage } from './../actions/navigation'
import GradientWrapper from './../components/wrappers/GradientWrapper'
import BackButton from './../components/primitives/BackButton'
import SuggestionsComp from './../components/Suggestion'
import { fontLoadedSelector } from './../reducers/app'

const mapStateToProps = state => ({
  suggestions: getSuggestions(state),
  isFontLoaded: fontLoadedSelector(state),
})

const mapDispatchToProps = {
  checkSuggestionsTime,
  aboutPage,
}

const { container } = pageLayout

const styles = StyleSheet.create({
  container,
})

type Props = {
  suggestions: Suggestion,
  checkSuggestionsTime: MainAction,
  isFontLoaded: Boolean,
  aboutPage: Function,
};

class MainView extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const { checkSuggestionsTime } = this.props
    checkSuggestionsTime()
  }

  render() {
    const { isFontLoaded, suggestions, aboutPage } = this.props
    if (!isFontLoaded) {
      return null
    }
    return (
      <GradientWrapper style={styles.container}>
        <SuggestionsComp
          suggestions={suggestions}
          isFontLoaded={isFontLoaded}
        />
        <BackButton onPress={aboutPage} title={'About'} />
      </GradientWrapper>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView)
