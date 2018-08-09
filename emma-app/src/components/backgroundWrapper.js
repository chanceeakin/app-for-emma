// @flow
import React from 'react'
import { LinearGradient } from 'expo'
import { StyleSheet } from 'react-native'
import colors from './../constants/colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  }
})

type Props = {
  children: React$Node,
  style: ?Object,
  color?: string
};

const backgroundWrapper = ({ children, style, color }: Props) => {
  const backGroundColor = () => {
    switch (color) {
    case 'orange':
      return [colors.lightPeach, colors.lightOrange]
    default:
      return [colors.green, colors.lightGreen]
    }
  }
  return (
    <LinearGradient
      colors={backGroundColor()}
      start={[0, 0]}
      end={[1, 1]}
      location={[0.25, 0.4, 1]}
      style={style ? style : styles.container}
    >
      {children}
    </LinearGradient>
  )
}

export default backgroundWrapper
