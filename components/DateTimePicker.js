import React, { useState } from "react"
import MomentUtils from '@date-io/moment'
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { makeStyles } from '@material-ui/core/styles'
import "moment/locale/pt-br";
import moment from 'moment'
import {
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import InputField from "./InputField";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
  },
  dateField: {
    width: '25vw',
  }
}))

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        borderRadius: 3
      }
    }
  }
})

const DatePickerField = ({ field, form, ...other }) => {
  const classes = useStyles()

  const [selectedDate, handleDateChange] = useState(new Date());
  const currentError = form.errors[field.name]

  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils} className={classes.root} locale='pt-br'>
        <KeyboardDateTimePicker
          className={classes.dateField}
          locale='pt-br'
          clearable
          disablePast
          name={field.name}
          value={field.value}
          minDate={field.minDate}
          format="DD/MM/YYYY HH:mm"
          helperText={currentError}
          error={Boolean(currentError)}
          showTodayButton
          inputVariant='outlined'
          onError={error => {
            // handle as a side effect
            if (error !== currentError) {
              form.setFieldError(field.name, error)
            }
          }}
          // if you are using custom validation schema you probably want to pass `true` as third argument
          onChange={date => {
            console.log(date)
            form.setFieldValue(field.name, date, true)
          }}
          {...other}
          />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  )
}

export default DatePickerField
