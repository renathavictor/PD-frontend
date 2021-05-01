import React from 'react'
import { useField } from 'formik'

const Select = props => {
  const [field, meta] = useField(props);

   return (
    <div>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default Select
