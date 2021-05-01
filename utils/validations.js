export const phoneMask = (phone) => {
  let numbers = phone.match(/\d/g)
  let numberLength = 0
  if (numbers) {
    numberLength = numbers.join('').length
  }
  if (numberLength > 10) {
    return ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  } else {
    return ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  }
}

export const validateTelephone = value => value !== undefined && (value.replace(/[^\d]/g, '').length) < 12 && (value.replace(/[^\d]/g, '').length) > 9

export const messages = {
  required: 'Required',
  minSize: size => `Must be ${size} characters or more`,
  maxSize: size => `Must be ${size} characters or less`,
  invalidEmail: 'Invalid email address',
  invalidTelephone: 'Insira um celular com 10 ou 11 números',
  passwordDoNotMatch: 'Password doesn\'t match'
}