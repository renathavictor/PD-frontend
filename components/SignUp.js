import React, { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'

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
    passwordConfirm: ''
  })
  const [loading, setLoading] = useState(false)

  const { name, email, password, passwordConfirm } = user

  const onChange = event => setUser({ ...user, [event.target.name]: event.target.value })

  const onSubmit = event => {
    event.preventDefault()
    if (name === '' || email === '' || password === '' || passwordConfirm === '') {
      setAlert('Please, enter all fields', 'danger')
    } else if (password !== passwordConfirm) {
      setAlert('Password doesn\'t match', 'danger')
    } else if (password.length < 6 || passwordConfirm < 6) {
      setAlert('Password must be at least 6 characters', 'danger')
    } else {
      register({
        ...user
      })
    }
  }

  return (
    <>
      <Form
        onSubmit={onSubmit}
      >
        <fieldset disabled={loading} aria-busy={loading}>
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
          </label>
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
          <label htmlFor="passwordConfirm">
            Confirm your password
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm your password"
              value={passwordConfirm}
              onChange={onChange}
            />
          </label>
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
    </>
  )
}

export default SignUp
