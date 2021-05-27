import React from 'react'
import { useField } from 'formik'

const Checkbox = props => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })

   return (
     <div>
       <label className="checkbox-input">
         <input type="checkbox" {...field} {...props} />
         {props.children}
       </label>
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   )
}

export default Checkbox
