// @flow
import React from 'react'
import Swiper from 'react-native-swiper'

type Props = {
  children?: React$Node
};

const wrapper = ({ children }: Props) => <Swiper>{children}</Swiper>

export default wrapper
