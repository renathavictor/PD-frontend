import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import Link from 'next/link'

// import IconButton from '@material-ui/core/IconButton'
// import Visibility from '@material-ui/icons/Visibility'
// import VisibilityOff from '@material-ui/icons/VisibilityOff'

import AlertContext from '../context/alert/alertContext'
import AuthContext from '../context/auth/authContext'
import Form from './styles/Form'

const Login = () => {
  const alertContext = useContext(AlertContext) || {}
  const authContext = useContext(AuthContext) || {}

  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/')
    }

    if (error && error.error?.match(/Invalid credentials/)) {
      setAlert('Credencial inválida', 'danger')
      clearErrors()
    }
  }, [error, isAuthenticated])

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = user

  const onChange = event => setUser({ ...user, [event.target.name]: event.target.value })

  const onSubmit = event => {
    event.preventDefault()
    if (email === '' || password === '') {
      setAlert('Por favor, digite todos com campos', 'danger')
    } else {
      login({ user: {
        email,
        password
      }
      })
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <Form
        onSubmit={onSubmit}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <h3>Sign in</h3>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={email}
              onChange={onChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              // type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Digite uma senha"
              value={password}
              onChange={onChange}
            />
          {/* <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton> */}
          </label>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2.5rem'
          }}>
            <Link href='/registrar'>
              <a>Create account</a>
            </Link>
            <button type="submit">Login</button>
          </div>
        </fieldset>
      </Form>
    </>
  )
}

export default Login
