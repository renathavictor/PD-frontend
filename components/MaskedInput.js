import React from 'react'
import MaskedInput from 'react-text-mask'

import Input from './Input'

const MaskedInputText = props => {
  return <Input {...props} component={MaskedInput} />
}

export default MaskedInputText
