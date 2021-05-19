import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'
import moment from 'moment'

import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, ButtonBase, Container } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import EditionContext from '../../context/editions/editionContext'
import EditionForm from '../../components/EditionForm';

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
  const editionContext = useContext(EditionContext)
  const { getEdition, loading, current, deleteEdition, error, clearCurrent } = editionContext

  if (loading) return <CircularProgress />
  console.log(id)
  useEffect(() => {
    // TODO
    // pegar a edição atual com o id que vem no param
    const getCurrent = async () => {
      await getEdition(id)
    }
    getCurrent()
  }, [])

  if (!current) return <h1>Edição não encontrada</h1>
  console.log(current.proof_ids.$oid)
  return (
    <Container maxWidth='sm'>
      <EditionHeaderStyles>
        <h1>{current.title}</h1>
        <Button color='secondary' onClick={async () => {
          await deleteEdition(current._id.$oid)
          Router.push('/')
          }}
        >
          <DeleteOutlineIcon />
          Deletar edição
        </Button>
        <Link href={`/edition/${current._id.$oid}/create-exam`}><Button color='primary' variant='contained'>+ Adicionar Prova</Button></Link>
      </EditionHeaderStyles>
      <EditionForm current={current} />
      {/* <EditionHeaderStyles>
        <h1>{current.title}</h1>
        <Link href={`/edition/${current._id.$oid}/create-exam`}><Button color='primary' variant='contained'>+ Adicionar Prova</Button></Link>
      </EditionHeaderStyles>
      <div>
        <p>{current.description}</p>
        <p>Data de inicio: {current.start_date_time}</p>
        <p>Data de fim: {current.end_date_time}</p>
      </div> */}
    </Container>
  )
}

export default Editions
