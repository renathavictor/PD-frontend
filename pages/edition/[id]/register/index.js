import React from 'react'
import { Button, ButtonBase, Card, Container, Grid } from '@material-ui/core'

import RegisterForm from '../../../../components/form/RegisterForm'

const Register = ({ query}) => {
  const { id } = query
  return (
    <>
      <h3>Registrar estudante</h3>
      <Card style={{ marginTop: '2rem', padding: '10px 2rem' }}>
        <RegisterForm editionId={id} />
      </Card>
    </>
  )
}

export default Register
