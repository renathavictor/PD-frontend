import React, { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form, Field } from 'formik';
import MaskedInput from './MaskedInput';
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'

import InputField from './InputField'
import AlertContext from '../context/alert/alertContext'
import AuthContext from '../context/auth/authContext'
import EditionContext from '../context/editions/editionContext'
import { FormEditionContainer } from './styles/Form'
import { messages, phoneMask, validateTelephone } from '../utils/validations'
import { ContactSupportOutlined } from '@material-ui/icons';
import DatePickerField from './DateTimePicker';
import moment from 'moment';

const CreateEditionForm = (props) => {
  const alertContext = useContext(AlertContext)
  const editionContext = useContext(EditionContext)

  const { setAlert } = alertContext
  const authContext = useContext(AuthContext)
  const { addEdition, error, current, editionErr } = editionContext
  const { user } = authContext
  console.log(user?.user)

  if (error && error.error) {
    setAlert(error.error, 'danger')
    clearError
  }
  console.log('props ', props)
  return (
    <FormEditionContainer maxWidth='sm'>
    <Formik
       initialValues={{
        title: '',
        description: '',
        start_date_time: new Date(),
        end_date_time: null,
        created_by: user?.user?._id?.$oid,
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(3, messages.minSize(3))
          .required(messages.required),
        description: Yup.string()
          .min(3, messages.minSize(3))
          .required(messages.required),
        start_date_time: Yup.string()
          .min(3, messages.minSize(3))
          .required(messages.required),
        end_date_time: Yup.string()
          .min(3, messages.minSize(3))
          .required(messages.required),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        // values.end_date_time = moment(values.end_date_time)
        console.log('values edit ', values)
        // await addEdition({ ...values })
        // ver o current para redirecionar para a tela da edição
        console.log('current ', current)
        setSubmitting(false)
        Router.push('/')
      }}
     >
      <Form>
        <h3>Create new Edition</h3>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <InputField
              type="text"
              name="title"
              label="Título"
              placeholder="Digite o título da Edição"
              />
          </Grid>
          <Grid item xs={12}>
            <InputField
              type="text"
              name="description"
              label="Descrição"
              placeholder="Digite a descrição da Edição"
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="start_date_time"
              placeholder="Data de início"
              component={DatePickerField}
              minDate={moment()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="end_date_time"
              placeholder="Data de encerramento"
              component={DatePickerField}
              // minDate={values?.start_date_time}
            />
          </Grid>
        </Grid>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2.5rem'
        }}>
          <button type="submit">Criar Edição</button>
        </div>
      </Form>
    </Formik>
  </FormEditionContainer>
  )
}

export default CreateEditionForm
