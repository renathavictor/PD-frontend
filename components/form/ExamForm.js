import React, { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import InputField from '../input/InputField'
import AlertContext from '../../context/alert/alertContext'
import { Container } from '../styles/Form'
import { messages } from '../../utils/validations'
import DatePicker from '../input/DatePicker'

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

const ExamForm = ({ editionId, handleChange, current, error, addExam }) => {
  const alertContext = useContext(AlertContext)
  const classes = useStyles();
  return (
    <Container>
      <Formik
          initialValues={{
           description: current?.description || '',
           start_date_time: current?.start_date_time || '',
           end_date_time: current?.end_date_time || '',
           logo: current?.logo || '',
           edition_id: editionId,
          }}
          validationSchema={Yup.object({
            description: Yup.string()
              .min(3, messages.minSize(3))
              .required(messages.required),
            start_date_time: Yup.string()
              .required(messages.required),
            end_date_time: Yup.string()
              .required(messages.required),
            logo: Yup.string()
              .required(messages.required),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            // redirecionar para tela da edição
            console.table(values)
            const response = await addExam({ ...values })
            console.log({response})
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
              <Button color='primary' variant='contained' type="submit">Criar Prova</Button>
            </div>
          </Form>
        </Formik>
    </Container>
  )
}

export default ExamForm
