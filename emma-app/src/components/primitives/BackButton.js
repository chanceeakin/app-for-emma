import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  backButton: {
    padding: 5,
    paddingBottom: 15
  },
  text: {}
})

type Props = {
  title: string,
  onPress: Function,
}

const BackButton =  ({onPress, title}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.backButton}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
)

export default BackButton
