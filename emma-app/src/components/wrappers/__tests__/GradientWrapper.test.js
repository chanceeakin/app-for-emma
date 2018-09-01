import React from 'react'
import Gradient from '../GradientWrapper'

import renderer from 'react-test-renderer'

describe('<GradientWrapper />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Gradient />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
