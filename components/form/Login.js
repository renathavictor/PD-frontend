import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form } from 'formik';
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
// import IconButton from '@material-ui/core/IconButton'
// import Visibility from '@material-ui/icons/Visibility'
// import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputField from '../input/InputField'
import { messages } from '../../utils/validations'

import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'
import { Container } from '../styles/Form'
import { Button } from '@material-ui/core'

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
    // background: '#004A94',
    backgroundImage: `linear-gradient(to bottom, #43C3DD 0%, #004A94 50%, #43C3DD 100%)`,
    fontSize: '2rem',
    textAlign: 'center'
  }
}))

const Login = ({ }) => {
  const classes = useStyles()
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
      <Container style={{ maxWidth: '30vw' }}>
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
          login({ user: values })
          setSubmitting(false)
        }}
      >
        <Form className={classes.root}>
          <div className={classes.side} />
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ marginLeft: '0.5rem' }}>
                <h3>Sign in</h3>
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
              marginTop: '2.5rem',
              marginBottom: '2.5rem'
            }}>
              <Link href='/register'>
                <a style={{ fontSize: '12px', marginRight: '2rem' }}>Create account</a>
              </Link>
              <Button color='primary' variant='contained' type="submit">Login</Button>
            </div>
          </div>
        </Form>
      </Formik>
      </Container>
  )
}

export default Login
