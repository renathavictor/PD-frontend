import React from 'react'
import MaskedInput from 'react-text-mask'

import InputField from './InputField'

const MaskedInputText = props => {
  return <InputField {...props} component={MaskedInput} />
}

export default MaskedInputText
