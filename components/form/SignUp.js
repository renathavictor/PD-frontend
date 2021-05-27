import React, { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form } from 'formik';
import MaskedInput from '../input/MaskedInput';
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import InputField from '../input/InputField'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'
import { Container } from '../styles/Form'
import { messages, phoneMask, validateTelephone } from '../../utils/validations'
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'minmax(50px, 25%) 1fr',
    padding: 0,
    margin: 0
  },
  side: {
    height: '100%',
    width: '4vw',
    backgroundImage: `linear-gradient(to bottom, #43C3DD 0%, #004A94 50%, #43C3DD 100%)`,
    fontSize: '2rem',
    textAlign: 'center'
  }
}))

const SignUp = () => {
  const classes = useStyles()
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { register, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/')
    }
    if (error && error.messages) {
      setAlert(error.messages, 'danger')
      clearErrors()
    }
  }, [error, isAuthenticated])

  return (
    <Container style={{ maxWidth: '30vw' }}>
    <Formik
       initialValues={{
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        cpf: '',
        telephone: '',
        profile_id: '606bcba2e4eafb10df0a47a4'
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, messages.minSize(3))
          .required(messages.required),
        email: Yup.string()
          .email(messages.invalidEmail)
          .required(messages.required),
        password: Yup.string()
          .min(6, messages.minSize(6))
          .required(messages.required),
          password_confirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Password doesn\'t match')
          .required(messages.required),
        cpf: Yup.string()
          .test('cpf', 'Invalid CPF', value => ((value && value.length) ? value.replace(/[^\d]/g, '').length : '') === 11),
        telephone: Yup.string()
          .required(messages.required)
          .test('phone', messages.invalidTelephone, value => validateTelephone(value)),
      })}
      onSubmit={(values, { setSubmitting }) => {
        register({ user: { ...values, cpf: values.cpf?.replace(/[^\d]/g, ''), telephone: values.telephone?.replace(/[^\d]/g, '') } })
        setSubmitting(false)
      }}
     >
      <Form className={classes.root}>
        <div className={classes.side} />
        <div>
          <Grid container spacing={3}>
            <Grid Grid item xs={12} style={{ marginLeft: '0.5rem' }}>
              <h3>Create your Account</h3>
            </Grid>
            <Grid item xs={12}>
              <InputField
                type="text"
                name="name"
                label="Name"
                placeholder="What is your name?"
                />
            </Grid>
            <Grid item xs={12}>
              <InputField
                type="email"
                name="email"
                label="Email"
                placeholder="What is your email?"
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                type="text"
                name="cpf"
                label="CPF"
                placeholder="What is your CPF?"
                mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                label="Telephone"
                placeholder="What is your telephone?"
                mask={phoneMask}
                name="telephone"
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                type="password"
                name="password_confirmation"
                label="Confirm password"
                placeholder="Confirm password"
              />
            </Grid>
          </Grid>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2.5rem',
            marginBottom: '2.5rem'
          }}>
            <Link href='/login'>
              <a>Sign in instead</a>
            </Link>
            <Button color='primary' variant='contained' type="submit">SignUp!</Button>
          </div>
        </div>
      </Form>
    </Formik>
  </Container>
  )
}

export default SignUp
