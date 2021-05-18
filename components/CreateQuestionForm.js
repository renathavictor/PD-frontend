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
import { messages, phoneMask, validateTelephone } from '../utils/validations'

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

const CreateQuestionForm = ({ editionId }) => {
  const alertContext = useContext(AlertContext)
  console.log('editionId ', editionId)
  const { setAlert } = alertContext
  const classes = useStyles();

  return (
    <FormEditionContainer>
      <Formik
            initialValues={{
              title: '',
              answer1: '',
              answer2: '',
              answer3: '',
              answer4: '',
              answer5: '',
              right_answer: '',
              proof_id: '',
              edition_id: editionId, // pegar o id da edição
           }}
          validationSchema={Yup.object({
            title: Yup.string()
             .min(3, messages.minSize(3))
             .required(messages.required),
             answer1: Yup.string()
              .min(3, messages.minSize(3))
              .required(messages.required),
            answer2: Yup.string()
              .min(3, messages.minSize(3))
              .required(messages.required),
            answer3: Yup.string()
              .min(3, messages.minSize(3))
              .required(messages.required),
            answer4: Yup.string()
              .min(3, messages.minSize(3))
              .required(messages.required),
            answer5: Yup.string()
              .min(3, messages.minSize(3))
              .required(messages.required),
            right_answer: Yup.string()
              .min(3, messages.minSize(3))
              .required(messages.required),
            proof_id: Yup.string()
              .min(3, messages.minSize(3))
              .required(messages.required),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log('values question ', values)
            // redirecionar para tela da edição
            setSubmitting(false)
          }}
          >
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              <Grid item xs={12}>
                <InputField
                  type="text"
                  name="title"
                  label="Titulo"
                  placeholder="Título"
                  />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  type="text"
                  name="answer1"
                  label="Opção 1"
                  placeholder="Título"
                  />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  type="text"
                  name="answer2"
                  label="Opção 2"
                  placeholder="Título"
                  />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  type="text"
                  name="answer3"
                  label="Opção 3"
                  placeholder="Título"
                  />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  type="text"
                  name="answer4"
                  label="Opção 4"
                  placeholder="Título"
                  />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  type="text"
                  name="answer5"
                  label="Opção 5"
                  placeholder="Título"
                  />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  type="text"
                  name="right_answer"
                  label="Opção correta"
                  placeholder="Título"
                  />
              </Grid>
              </Grid>
            </Grid>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2.5rem'
            }}>
              <button type="submit">Adicionar Questão</button>
            </div>
          </Form>
        </Formik>
  </FormEditionContainer>
  )
}

export default CreateQuestionForm
