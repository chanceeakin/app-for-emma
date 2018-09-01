import React from 'react'
import Suggestion from '../Suggestion'

import renderer from 'react-test-renderer'

const props = {
  suggestions: {
    title: 'hi',
    description: 'person actually reading my tests',
  },
}

describe('Suggestions Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Suggestion {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
