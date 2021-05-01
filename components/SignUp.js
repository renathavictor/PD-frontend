import React, { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form } from 'formik';
import MaskedInput from './MaskedInput';
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'

import InputField from './InputField'
import AlertContext from '../context/alert/alertContext'
import AuthContext from '../context/auth/authContext'
import FormContainer from './styles/Form'
import { messages, phoneMask, validateTelephone } from '../utils/validations'

const SignUp = () => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { register, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/')
    }
    if (error && error.error) {
      setAlert(error.error, 'danger')
      clearErrors()
    }
  }, [error, isAuthenticated])

  return (
    <FormContainer>
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
        console.log('values register ', values)
        register({ user: values })
        setSubmitting(false)
      }}
     >
      <Form>
        <h3>Create your Account</h3>
        <Grid container spacing={3}>
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
            <MaskedInput
              type="text"
              name="cpf"
              label="CPF"
              placeholder="What is your CPF?"
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
            />
          </Grid>
          <Grid item xs={12}>
            <MaskedInput
              label="Telephone"
              placeholder="What is your telephone?"
              mask={phoneMask}
              name="telephone"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          marginTop: '2.5rem'
        }}>
          <Link href='/login'>
            <a>Sign in instead</a>
          </Link>
          <button type="submit">SignUp!</button>
        </div>
      </Form>
    </Formik>
  </FormContainer>
  )
}

export default SignUp
