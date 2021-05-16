import React, { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form } from 'formik';
import MaskedInput from './MaskedInput';
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'

import InputField from './InputField'
import AlertContext from '../context/alert/alertContext'
import FormContainer from './styles/Form'
import { messages, phoneMask, validateTelephone } from '../utils/validations'

const CreateExamForm = () => {
  const alertContext = useContext(AlertContext)

  const { setAlert } = alertContext
  // profile_id: '606bcba2e4eafb10df0a47a4' <- user

  return (
    <FormContainer>
    <Formik
       initialValues={{
        description: '',
        start_date_time: '',
        end_date_time: '',
        logo: '',
        edition_id: '', // pegar o id da edição
      }}
      validationSchema={Yup.object({
        description: Yup.string()
          .min(3, messages.minSize(3))
          .required(messages.required),
        start_date_time: Yup.string()
          .min(3, messages.minSize(3))
          .required(messages.required),
        end_date_time: Yup.string()
          .min(3, messages.minSize(3))
          .required(messages.required),
        logo: Yup.string()
          .required(messages.required),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log('values edit ', values)
        // redirecionar para tela da edição
        setSubmitting(false)
      }}
     >
      <Form>
        <h3>Create new Edition</h3>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <Grid item xs={12}>
            <InputField
              type="text"
              name="description"
              label="Descrição"
              placeholder="Digite a descrição da Edição"
              />
          </Grid>
          <Grid item xs={12}>
            <InputField
              type="date"
              name="start_date_time"
              label="Data de início"
              placeholder="Data de início da Edição"
              />
          </Grid>
          <Grid item xs={12}>
            <InputField
              type="date"
              name="end_date_time"
              label="Data de encerramento"
              placeholder="Data de encerramento da Edição"
              />
          </Grid>
          <InputField
              type="text"
              name="logo"
              label="Logo"
              placeholder="Adicione a logo da edição"
              />
          </Grid>
        </Grid>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2.5rem'
        }}>
          <button type="submit">Criar Prova</button>
        </div>
      </Form>
    </Formik>
  </FormContainer>
  )
}

export default CreateExamForm
