import React from 'react'
import MaskedInput from 'react-text-mask'
import NumberFormat from 'react-number-format'

import InputField from './InputField'

const MaskedInputText = props => {
  const { inputRef, name, ...other } = props;

  const fieldMask = () => {
    switch (name) {
      case 'telephone':
        let numbers = props.value.match(/\d/g)
        let numberLength = 0
        if (numbers) {
          numberLength = numbers.join('').length
        }
        if (numberLength > 10) {
          return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        } else {
          return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        }
      case 'cpf':
        return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
      default:
        return []
    }
  }

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={fieldMask}
      placeholderChar={"\u2000"}
      guide
      keepCharPositions
    />
  )

}

export default MaskedInputText
