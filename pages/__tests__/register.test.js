import React from 'react'
import { shallow } from 'enzyme'

import RegisterPage from '../register'
import { findByTestAttr } from '../../utils/testUtils'

describe('Page - Register page', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<RegisterPage />)
  })
  test('Render page without crash', () => {
    let component = findByTestAttr(wrapper, 'register-page')
    expect(component.length).toBe(1)
  })
})
