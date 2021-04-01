import React from 'react'
import { shallow } from 'enzyme'

import SignInPage from '../login'
import { findByTestAttr } from '../../utils/testUtils'

describe('Page - Login page', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<SignInPage />)
  })
  test('Render page without crash', () => {
    let component = findByTestAttr(wrapper, 'login-page')
    expect(component.length).toBe(1)
  })
})
