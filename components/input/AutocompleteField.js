import React from 'react';
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useField } from 'formik'
import { ErrorMessage } from '../styles/Form'

export default function ComboBox({ field, form, options, ...props }) {
  const [meta] = useField({ ...props, name: field.name})
  return (
    <>
    <Autocomplete
      {...props}
      id={field.name}
      name={field.name}
      options={options}
      onChange={(_, option) => form.setFieldValue(field.name, option ? option.value : '', false)}
      getOptionLabel={(option) => option.label}
      style={{ width: '23ch' }}
      renderInput={(params) => <TextField {...field} {...params} label={props.label} variant="outlined" />}
    />
    {
      meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null
    }
    </>
  );
}
