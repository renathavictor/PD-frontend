import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import InputField from '../input/InputField'
import { Container } from '../styles/Form'
import AutocompleteField from '../../components/input/AutocompleteField'
import { messages } from '../../utils/validations'

import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'
import RegisterContext from '../../context/register/registerContext'
import { PARTICIPANT_PROFILE_ID } from '../../utils/constants'
import api from '../../utils/api'
import { parseDataToOption } from '../../utils/parses'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'minmax(50px, 25%) 1fr',
    padding: 0,
    margin: 0
  }
}))

const RegisterForm = ({ editionId }) => {
  const classes = useStyles()
  const alertContext = useContext(AlertContext) || {}
  const authContext = useContext(AuthContext) || {}
  const registerContext = useContext(RegisterContext) || {}

  const { addRegister, error, clearRegisters } = registerContext

  const [users, setUsers] = useState([])

  const { setAlert } = alertContext
  const { user, loading, isAuthenticated } = authContext

  useEffect(() => {
    authContext.loadUser()
    if (!loading && !isAuthenticated) {
      Router.push('/login')
    }

    const loadUsers = async () => {
      await api.get('/users')
        .then(response => dataToOption(response.data))
        .catch(err => console.error(err))
    }
    loadUsers()
  }, [isAuthenticated])

  const dataToOption = data => {
    const newData = parseDataToOption(data)
    setUsers(newData)
  }

  useEffect(() => {
    if (error?.messages) {
      setAlert(error.messages, 'danger')
      clearErrors()
    }
  }, [error])

  const initialValues = {
    state: '',
    city: '',
    school: '',
    edition_id: editionId, //pegar a edição do query
    user_id: 0
  }

  return user?.user?.profile_id?.$oid !== PARTICIPANT_PROFILE_ID ? (
      <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          state: Yup.string()
            .required(messages.required),
          city: Yup.string()
            .required(messages.required),
          school: Yup.string()
            .required(messages.required),
          user_id: Yup.string()
            .required(messages.required)
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.table(values)
          await addRegister(values)
          setSubmitting(false)
          clearRegisters()
        }}
      >
        <Form className={classes.root}>
          <div className={classes.side} />
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ marginLeft: '0.5rem' }}>
                <h3>Registrar estudante</h3>
              </Grid>
              <Grid item xs={12}>
                <Field
                  name='user_id'
                  label='Estudantes'
                  options={users || []}
                  component={AutocompleteField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name='state'
                  label='Estados'
                  options={[{ value: 'Paraíba', label: 'Paraíba' }]}
                  component={AutocompleteField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name='city'
                  label='Cidade'
                  options={[{ value: 'João Pessoa', label: 'João Pessoa' }]}
                  component={AutocompleteField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name='school'
                  label='Escola'
                  options={[{ value: 'IFPB', label: 'IFPB' }]}
                  component={AutocompleteField}
                />
              </Grid>
            </Grid>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2.5rem',
              marginBottom: '2.5rem'
            }}>
              <Button color='primary' variant='contained' type="submit">Adicionar</Button>
            </div>
          </div>
        </Form>
      </Formik>
      </>
  ) : <p>Não autorizado</p>
}

export default RegisterForm
