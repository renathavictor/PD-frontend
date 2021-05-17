import React from 'react'
import { useField } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import { ErrorMessage } from './styles/Form'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '25vw',
    },
  },
}))

const InputField = ({
  component: CustomComponent,
  ...props
}) => {
  const classes = useStyles()
  const [field, meta] = useField(props)

  const renderInput = () => {
    if (CustomComponent) {
      return <CustomComponent {...field} {...props} />;
    }

    return <input className="text-input" {...field} {...props} />
  };

   return (
    <span className={classes.root}>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      {renderInput()}
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </span>
  )
}

InputField.propTypes = {

}

export default InputField
