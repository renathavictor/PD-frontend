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
import QuestionContext from '../../context/questions/questionContext'
import { Container } from '../styles/Form'
import { messages, phoneMask, validateTelephone } from '../../utils/validations'
import AutocompleteField from '../input/AutocompleteField'

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

const QuestionForm = ({ editionId, currentExamId, query }) => {
  const alertContext = useContext(AlertContext)
  const questionContext = useContext(QuestionContext)
  const { setAlert } = alertContext
  const { addQuestion, current, clearCurrent } = questionContext
  const classes = useStyles();
  return (
    <Container
      style={{
        boxShadow: 'none',
        background: 'none',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Formik
        initialValues={{
          title: '',
          answer1: '',
          answer2: '',
          answer3: '',
          answer4: '',
          answer5: '',
          right_answer: '',
          proof_id: currentExamId,
          // edition_id: editionId, // pegar o id da edição
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
            .required(messages.required)
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await addQuestion({ ...values })
          setSubmitting(false)
          resetForm()
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
                <Field
                  name='right_answer'
                  label='Resposta Correta'
                  options={[
                    { value: 'answer1', label: 'Opção 1' },
                    { value: 'answer2', label: 'Opção 2' },
                    { value: 'answer3 ', label: 'Opção 3' },
                    { value: 'answer4 ', label: 'Opção 4' },
                    { value: 'answer5 ', label: 'Opção 5' },
                  ]}
                  component={AutocompleteField}
                />
              </Grid>
              </Grid>
            </Grid>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2.5rem'
            }}>
              <Button color='primary' variant='contained' type="submit">Adicionar Questão</Button>
            </div>
          </Form>
        </Formik>
    </Container>
  )
}

export default QuestionForm
