import React from 'react'
import { useField } from 'formik'

import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

import MaskedInputField from './MaskedInput'
import { ErrorMessage } from '../styles/Form'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    '.MuiOutlinedInput-root': {
      padding: 6
    },
    '& > *': {
      width: '23ch',
    },
  },
}));

const InputField = ({
  component: CustomComponent,
  ...props
}) => {
  const [field, meta] = useField(props)
  const classes = useStyles()

  const renderInput = () => {
    if (props.mask) {
      return (
        <TextField
          {...field}
          {...props}
          id={props.name}
          variant="outlined"
          InputProps={{
            inputComponent: MaskedInputField
          }}
      />
      )
    }
    return <TextField {...field} {...props} variant="outlined" style={{ padding: '1rem auto' }} />
  };

   return (
    <div className={classes.root} >
      {renderInput()}
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </div>
  )
}

InputField.propTypes = {

}

export default InputField
