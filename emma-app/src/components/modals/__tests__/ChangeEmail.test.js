import React from 'react'
import ChangeEmail from '../ChangeEmail'

import renderer from 'react-test-renderer'

const props = {
  updatedEmail: 'email',
  updateEmailPatchTextField: jest.fn(),
  isPatchingEmailError: false,
  changeEmail: jest.fn(),
  isEmailModalShown: false,
  toggleEmailModal: jest.fn(),
}

jest.mock('TouchableOpacity', () => {
  const mockComponent = require('jest-react-native')
  return mockComponent('TouchableOpacity')
})

jest.mock('TouchableHighlight', () => {
  const mockComponent = require('jest-react-native')
  return mockComponent('TouchableHighlight')
})

describe('<ChangeEmail />', () => {
  afterAll = () => {
    jest.mockRestore()
  }
  it('renders correctly', () => {
    const tree = renderer.create(<ChangeEmail {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
