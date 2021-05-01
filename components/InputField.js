import React from 'react'
import { useField } from 'formik'

import { ErrorMessage } from './styles/Form'

const InputField = ({
  component: CustomComponent,
  ...props
}) => {
  const [field, meta] = useField(props)

  const renderInput = () => {
    if (CustomComponent) {
      return <CustomComponent {...field} {...props} />;
    }

    return <input className="text-input" {...field} {...props} />
  };

   return (
    <>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      {renderInput()}
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </>
  )
}

InputField.propTypes = {

}

export default InputField
