// @flow
import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  bigButton: {},
  text: {}
})

type Props = {
  title: string,
  onPress: Function,
}

const BigButton =  ({onPress, title}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.bigButton}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
)

export default BigButton
