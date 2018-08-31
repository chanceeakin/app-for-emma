//@flow
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import type { Suggestion } from './../types/Suggestions.js.flow'
import { pageLayout, font, text } from './../styles'

type Props = {
  suggestions: Suggestion,
  isFontLoaded: Boolean,
};

const styles = StyleSheet.create({
  row: pageLayout.row,
  title: text.title,
  description: text.description,
  font: font.skia,
})

const SuggestionComp = ({ suggestions, isFontLoaded }: Props) => (
  <View style={styles.row}>
    {suggestions.title ? (
      <Text style={[styles.title, isFontLoaded ? styles.font : null]}>
        {suggestions.title}
      </Text>
    ) : null}
    {suggestions.description ? (
      <Text style={[styles.description, styles.font]}>
        {suggestions.description}
      </Text>
    ) : null}
  </View>
)

export default SuggestionComp
