import React from 'react'
import { useField } from 'formik'

import { ErrorMessage } from './styles/Form'

const Input = ({
  component: CustomComponent,
  label,
  ...props
}) => {
  const [field, meta] = useField(props)

  console.log('component ', CustomComponent)
  const renderInput = () => {
    if (CustomComponent) {
      return <CustomComponent { ...props } />
    }
    return <input className="text-input" {...field} {...props} />
  }

   return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      {renderInput()}
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </>
  )
}

Input.propTypes = {

}

export default Input
