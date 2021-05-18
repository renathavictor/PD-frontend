import React, { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form } from 'formik';
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';

import InputField from './InputField'
import AlertContext from '../context/alert/alertContext'
import { FormEditionContainer } from './styles/Form'
import { messages } from '../utils/validations'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    fontSize: '1rem !important',
    margin: '3rem 1rem 2rem 0',
  },
  nextButton: {
    margin: '3rem 1rem 2rem 0',
    fontSize: '1rem !important',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Criar prova', 'Adicionar Questões'];
}

const CreateExamForm = ({ editionId, handleChange, current, error, addExam }) => {
  const alertContext = useContext(AlertContext)
  const classes = useStyles();
  console.log('current ', current)
  return (
    <FormEditionContainer>
      <Formik
          initialValues={{
           description: current?.description || '',
           start_date_time: current?.start_date_time || '',
           end_date_time: current?.end_date_time || '',
           logo: current?.logo || '',
           edition_id: editionId, // pegar o id da edição
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
          onSubmit={async (values, { setSubmitting }) => {
            console.log('values exam ', values)
            // redirecionar para tela da edição
            const response = await addExam({ ...values })
            console.log({ response })
            handleChange('', 1)
            setSubmitting(false)
          }}
          >
          <Form>
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
    </FormEditionContainer>
  )
}

export default CreateExamForm
