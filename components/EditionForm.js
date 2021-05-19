import React, { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form } from 'formik';
import MaskedInput from './MaskedInput';
import * as Yup from 'yup'
import moment from 'moment'

import Grid from '@material-ui/core/Grid'

import InputField from './InputField'
import AlertContext from '../context/alert/alertContext'
import AuthContext from '../context/auth/authContext'
import EditionContext from '../context/editions/editionContext'
import { FormEditionContainer } from './styles/Form'
import { messages, phoneMask, validateTelephone } from '../utils/validations'
import { ContactSupportOutlined } from '@material-ui/icons';

const EditionForm = (props) => {
  console.log('PROPSSSSSSSSSSSS ', props)
  const alertContext = useContext(AlertContext)
  const editionContext = useContext(EditionContext)

  const { setAlert } = alertContext
  const authContext = useContext(AuthContext)
  const { addEdition, updateEdition, error, current, clearErros } = editionContext
  const { user } = authContext
  console.log(user?.user)

  if (error && error.error) {
    setAlert(error.error, 'danger')
    clearErros()
  }
  const isEdit = !!props?.current
  const startDate = props?.current?.start_date_time ? moment(props.current.start_date_time).format('YYYY-MM-DD') : ''
  const endDate = props?.current?.end_date_time ? moment(props.current.end_date_time).format('YYYY-MM-DD') : ''

  return (
    <FormEditionContainer>
    <Formik
       initialValues={{
        title: props?.current?.title || '',
        description: props?.current?.description ||'',
        start_date_time: startDate ||'',
        end_date_time: endDate ||'',
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
        console.log('values edit ', values)
        if (isEdit) {
          // editar
          await updateEdition({ ...values, id: props.current._id.$oid })
        } else {
          await addEdition({ ...values })
        }
        // ver o current para redirecionar para a tela da edição
        console.log('current ', current)
        setSubmitting(false)
        Router.push('/')
      }}
     >
      <Form>
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
        </Grid>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2.5rem'
        }}>
          <button type="submit">{isEdit ? 'Editar Edição' : 'Criar Edição'}</button>
        </div>
      </Form>
    </Formik>
  </FormEditionContainer>
  )
}

export default EditionForm
