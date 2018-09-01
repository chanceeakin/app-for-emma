import React from 'react'
import BackButton from '../BackButton'

import renderer from 'react-test-renderer'

const props = {
  title: 'onpress',
  onPress: jest.fn(),
}

jest.mock('TouchableOpacity', () => {
  const mockComponent = require('jest-react-native')
  return mockComponent('TouchableOpacity')
})

describe('<BackButton />', () => {
  afterAll = () => {
    jest.mockRestore()
  }
  it('renders correctly', () => {
    const tree = renderer.create(<BackButton {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
