import React from 'react'
import { useRouter } from 'next/router'
import { Button, ButtonBase, Card, Container, Grid } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import RegisterForm from '../../../../components/form/RegisterForm'

const Register = ({ query}) => {
  const { id } = query
  const router = useRouter()
  return (
    <>
      <h3><ArrowBackIosIcon style={{ cursor: 'pointer' }} onClick={() => router.back()} /> Registrar estudante</h3>
      <Card style={{ marginTop: '2rem', padding: '10px 2rem' }}>
        <RegisterForm editionId={id} />
      </Card>
    </>
  )
}

export default Register
