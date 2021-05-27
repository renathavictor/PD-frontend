import React from "react"
import { useField } from 'formik'
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers"
import moment from "moment";
import MomentUtils from '@date-io/moment'
import "moment/locale/pt-br";
import { makeStyles } from '@material-ui/core/styles'
import { ErrorMessage } from '../styles/Form'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '23ch',
    marginLeft: '0.5rem',
    marginBottom: '10px',
    '& MuiInputAdornment-root.MuiButtonBase-root button': {
      backgroundColor: 'none'
    }
  }
}));

const DatePicker = ({ field, form, ...other }) => {
  const classes = useStyles()
  const [meta] = useField({ ...other, name: field.name})
  const currentError = form.errors[field.name]

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale='pt-br'>
      <KeyboardDateTimePicker
        className={classes.root}
        ampm={false}
        clearable
        disablePast
        inputVariant="outlined"
        variant="inline"
        label={other.placeholder}
        name={field.name}
        value={field.value}
        format="DD/MM/yyyy hh:mm:ss"
        helperText={currentError}
        error={Boolean(currentError)}
        // onError={error => {
        //   // handle as a side effect
        //   if (error !== currentError) {
        //     form.setFieldError(field.name, error)
        //   }
        // }}
        // if you are using custom validation schema you probably want to pass `true` as third argument
        onChange={date => form.setFieldValue(field.name, date, false)}
        {...other}
      />
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </MuiPickersUtilsProvider>
  )
}
export default DatePicker
