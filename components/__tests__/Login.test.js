import React from 'react'
import { shallow } from 'enzyme'

import Login from '../Login'

const wrapper = shallow(<Login />)

describe('Component - Login', () => {
  it('renders without crash', () => {
    expect(wrapper).toHaveLength(1)
  })
})
