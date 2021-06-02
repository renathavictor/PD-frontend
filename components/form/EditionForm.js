import React, { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form, Field } from 'formik';
import MaskedInput from '../input/MaskedInput';
import * as Yup from 'yup'
import moment from 'moment'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import Grid from '@material-ui/core/Grid'

import InputField from '../input/InputField'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'
import EditionContext from '../../context/editions/editionContext'
import { Container } from '../styles/Form'
import { messages, phoneMask, validateTelephone } from '../../utils/validations'
import { ContactSupportOutlined } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import DatePicker from '../input/DatePicker'

const EditionForm = (props) => {
  const alertContext = useContext(AlertContext)
  const editionContext = useContext(EditionContext)

  const { setAlert } = alertContext
  const authContext = useContext(AuthContext)
  const { addEdition, updateEdition, error, current, clearErros } = editionContext
  const { user } = authContext

  if (error && error.error) {
    setAlert(error.error, 'danger')
    clearErros()
  }
  const isEdit = !!props?.current
  const startDate = props?.current?.start_date_time ? moment(props.current.start_date_time).format('DD-MM-YYYY') : ''
  const endDate = props?.current?.end_date_time ? moment(props.current.end_date_time).format('DD-MM-YYYY') : ''

  return (
    <Container style={{ justifyContent: 'center' , paddingBottom: '2rem'}}>
      <Formik
        initialValues={{
          title: props?.current?.title || '',
          description: props?.current?.description ||'',
          start_date_time: props?.current?.start_date_time ||'',
          end_date_time: props?.current?.end_date_time ||'',
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
            .required(messages.required),
          end_date_time: Yup.string()
            .required(messages.required),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          if (isEdit) {
            // editar
            await updateEdition({ ...values, id: props.current._id.$oid })
          } else {
            await addEdition({ ...values })
          }
          // ver o current para redirecionar para a tela da edição
          setSubmitting(false)
          Router.push('/')
        }}
      >
      <Form>
        <h3><ArrowBackIosIcon style={{ cursor: 'pointer' }} onClick={() => Router.back()} /> {!isEdit ? 'Nova Edição' : 'Editar Edição'}</h3>
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
            <Field
              name="start_date_time"
              label="Data de início"
              placeholder="Data de início"
              component={DatePicker}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="end_date_time"
              label="Data de encerramento"
              placeholder="Data de encerramento"
              component={DatePicker}
            />
          </Grid>
        </Grid>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2.5rem'
        }}>
          <Button color='primary' variant='contained' type="submit">{isEdit ? 'Editar Edição' : 'Criar Edição'}</Button>
        </div>
      </Form>
    </Formik>
  </Container>
  )
}

export default EditionForm
