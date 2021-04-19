import React, { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form } from 'formik';
import MaskedInput from "./MaskedInput";
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'

import Input from './Input'
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

  const onChange = event => setUser({ ...user, [event.target.name]: event.target.value })

  return (
    <FormContainer>
    <Formik
       initialValues={{
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        cpf: '',
        telephone: '',
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
          passwordConfirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Password doesn\'t match')
          .required(messages.required),
        cpf: Yup.string()
          .test('cpf', 'Invalid CPF', value => ((value && value.length) ? value.replace(/[^\d]/g, '').length : '') === 11),
        telephone: Yup.string()
          .required(messages.required)
          .test('phone', messages.invalidTelephone, value => validateTelephone(value)),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log('values ', values)
        // register({ user: values })
        setSubmitting(false)
      }}
     >
      <Form>
        <fieldset disabled={loading} aria-busy={loading}>
        <h3>Create your Account</h3>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Input
              type="text"
              name="name"
              label="Name"
              placeholder="What is your name?"
              // value={name}
              // onChange={onChange}
              />
          </Grid>
          <Grid item xs={12}>
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="What is your email?"
              // value={email}
              // onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MaskedInput
              type="text"
              name="cpf"
              label="CPF"
              placeholder="What is your CPF?"
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
              // value={cpf}
              // onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <MaskedInput
              mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              placeholder="Enter a phone number"
              id="my-input-id"
              render={(ref, props) => (
                <MyStyledInput innerRef={ref} {...props} />
              )}
            /> */}
            <MaskedInput
              label="Telephone"
              placeholder="What is your telephone?"
              mask={phoneMask}
              name="telephone"
              type="text"
              // value={telephone}
              // onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              // value={password}
              // onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              type="password"
              name="passwordConfirm"
              label="Confirm password"
              placeholder="Confirm password"
              // value={passwordConfirm}
              // onChange={onChange}
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
        </fieldset>
      </Form>
      </Formik>
    </FormContainer>
  )
}

export default SignUp
