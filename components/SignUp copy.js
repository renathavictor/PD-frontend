import React, { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import Grid from '@material-ui/core/Grid'

import AlertContext from '../context/alert/alertContext'
import AuthContext from '../context/auth/authContext'
import Form from './styles/Form'

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

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    cpf: '',
    telephone: '',
    profile_id: '606bcba2e4eafb10df0a47a4'

  })
  const [loading, setLoading] = useState(false)

  const { name, email, cpf, telephone, password, passwordConfirm } = user
// MODIFICAR ESTILO DO FORM
// ADICIONAR VALIDAÇÃO E MASCARA DO CPF
// ADICIONAR VALIDAÇÃO E MASCARA DO TELEFONE
  const onChange = event => setUser({ ...user, [event.target.name]: event.target.value })

  const onSubmit = event => {
    event.preventDefault()
    if (name === '' || email === '' || password === '' || passwordConfirm === '' || cpf === '' || telephone === '' ) {
      setAlert('Please, enter all fields', 'danger')
    } else if (password !== passwordConfirm) {
      setAlert('Password doesn\'t match', 'danger')
    } else if (password.length < 6 || passwordConfirm < 6) {
      setAlert('Password must be at least 6 characters', 'danger')
    } else if (telephone.match()) {

    } else {
      register({ user: {
        ...user
      }
      })
    }
  }

  return (
    <>
    <Formik
       initi
       validate={values => {
         const errors = {}
         if (!values.email) {
           errors.email = 'Required'
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address'
         }
         return errors
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2))
           setSubmitting(false)
         }, 400)
       }}
     >
      <Form
        onSubmit={onSubmit}
      >
        <fieldset disabled={loading} aria-busy={loading}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <h3>Create your Account</h3>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              placeholder="What is your name?"
              value={name}
              onChange={onChange}
              />
            </ label>
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                placeholder="What is your email?"
                value={email}
                onChange={onChange}
              />
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="cpf">
              CPF
              <input
                type="text"
                name="cpf"
                placeholder="What is your CPF?"
                value={cpf}
                onChange={onChange}
              />
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="telephone">
              Telephone
              <input
                type="text"
                name="telephone"
                placeholder="What is your telephone?"
                value={telephone}
                onChange={onChange}
              />
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={onChange}
              />
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="passwordConfirm">
              Confirm password
              <input
                type="password"
                name="passwordConfirm"
                placeholder="Confirm password"
                value={passwordConfirm}
                onChange={onChange}
              />
            </label>
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
        </fieldset>
      </Form>
      </Formik>
    </>
  )
}

export default SignUp
