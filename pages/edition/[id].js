import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'
import moment from 'moment'

import CircularProgress from '@material-ui/core/CircularProgress'
import { Button, ButtonBase, Card, Container } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

import EditionContext from '../../context/editions/editionContext'
import AuthContext from '../../context/auth/authContext'

import EditionForm from '../../components/form/EditionForm'
import AutocompleteField from '../../components/input/AutocompleteField'
import RegisterForm from '../../components/form/RegisterForm'
import { PARTICIPANT_PROFILE_ID } from '../../utils/constants'

const EditionHeaderStyles = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  button {
    height: 4rem;
    margin-top: 2rem;
  }
`

const Editions = ({ query }) => {
  const { id } = query
  const authContext = useContext(AuthContext) || {}
  const editionContext = useContext(EditionContext)
  const { getEdition, loading, current, deleteEdition, error, clearCurrent } = editionContext
  const { user, isAuthenticated } = authContext

  if (loading) return <CircularProgress />

  useEffect(() => {
    // TODO
    // pegar a edição atual com o id que vem no param
    const getCurrent = async () => {
      await getEdition(id)
    }
    getCurrent()
  }, [])

  useEffect(() => {
    // get
  }, [current])

  if (!current && !loading) return <h1>Edição não encontrada</h1>

  return user?.user?.profile_id?.$oid !== PARTICIPANT_PROFILE_ID ? (
    <Container maxWidth='sm'>
      <EditionHeaderStyles>
        <h1>{current.title}</h1>
        <Button color='secondary' onClick={async () => {
          await deleteEdition(current._id.$oid)
          Router.push('/')
          }}
        >
          <DeleteOutlineIcon />
        </Button>
        <Link href={`/edition/${current._id.$oid}/create-exam`}><Button color='primary' variant='contained'>+ Adicionar Prova</Button></Link>
      </EditionHeaderStyles>
      <Card style={{ marginTop: '2rem', padding: '10px 2rem' }}>
        <p>{current.description}</p>
        <p>Data de inicio: {moment(current.start_date_time).format('DD/MM/YYYY HH:mm')}</p>
        <p>Data de fim: {moment(current.end_date_time).format('DD/MM/YYYY HH:mm')}</p>
      </Card>
        <h3>Estudantes</h3>
      <Card style={{ marginTop: '2rem', padding: '10px 2rem' }}>
        <RegisterForm editionId={id} />
      </Card>
    </Container>
  ) : (
    <>
      <EditionHeaderStyles>
        <h1>{current.title}</h1>
      </EditionHeaderStyles>
      <Card style={{ marginTop: '2rem', padding: '10px 2rem' }}>
        <p>{current.description}</p>
        <p>Data de inicio: {moment(current.start_date_time).format('DD/MM/YYYY HH:mm')}</p>
        <p>Data de fim: {moment(current.end_date_time).format('DD/MM/YYYY HH:mm')}</p>
      </Card>
    </>
  )
}

export default Editions
