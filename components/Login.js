import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form } from 'formik';
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'

// import IconButton from '@material-ui/core/IconButton'
// import Visibility from '@material-ui/icons/Visibility'
// import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputField from './InputField'
import { messages } from '../utils/validations'

import AlertContext from '../context/alert/alertContext'
import AuthContext from '../context/auth/authContext'
import FormContainer from './styles/Form'

const Login = () => {
  const alertContext = useContext(AlertContext) || {}
  const authContext = useContext(AuthContext) || {}

  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/')
    }
    if (error?.messages) {
      setAlert(error.messages, 'danger')
      clearErrors()
    }
  }, [error, isAuthenticated])

  return (
    <FormContainer>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email(messages.invalidEmail)
            .required(messages.required),
          password: Yup.string()
            .min(6, messages.minSize(6))
            .required(messages.required)
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log('values login ', values)
          login({ user: values })
          setSubmitting(false)
        }}
      >
        <Form>
          <h3>Sign in</h3>
          <Grid container spacing={3}>
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
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
            </Grid>
          </Grid>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2.5rem'
          }}>
            <Link href='/register'>
              <a>Create account</a>
            </Link>
            <button type="submit">Login</button>
          </div>
        </Form>
      </Formik>
    </FormContainer>
  )
}

export default Login
