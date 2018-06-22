// @flow
import React from 'react'
import GestureRecognizer, {
  swipeDirections
} from 'react-native-swipe-gestures'

type Props = {
  children: React$Node
};

const GestureWrapper = ({ children }: Props) => (
  <GestureRecognizer>{children}</GestureRecognizer>
)

export default GestureWrapper
