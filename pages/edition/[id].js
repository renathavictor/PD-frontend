import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'
import moment from 'moment'

import CircularProgress from '@material-ui/core/CircularProgress'
import { Button, ButtonBase, Card, Container, Grid } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import PeopleIcon from '@material-ui/icons/People'
import AssessmentIcon from '@material-ui/icons/Assessment'
import Chip from '@material-ui/core/Chip'
import EventIcon from '@material-ui/icons/Event'

import EditionContext from '../../context/editions/editionContext'
import AuthContext from '../../context/auth/authContext'

import EditionForm from '../../components/form/EditionForm'
import AutocompleteField from '../../components/input/AutocompleteField'
import RegisterForm from '../../components/form/RegisterForm'
import { PARTICIPANT_PROFILE_ID } from '../../utils/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '5rem',
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    cursor: 'pointer',
    color: '#616161',
    margin: 'auto',
    padding: '1rem',
    display: 'flex',
    flexFlow: 'column',
    '& svg': {
      margin: 'auto',
      fontSize: '3rem'
    }
  }
}));

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
  const classes = useStyles()
  const authContext = useContext(AuthContext) || {}
  const editionContext = useContext(EditionContext)
  const { getEdition, loading, current, deleteEdition, error, clearCurrent } = editionContext
  const { user, isAuthenticated } = authContext

  if (loading) return <CircularProgress />

  useEffect(() => {
    const getCurrent = async () => {
      await getEdition(id)
    }
    getCurrent()
  }, [])

  useEffect(() => {
    // get
  }, [current])

  if (!current && !loading) return <h1>Edição não encontrada</h1>
  console.log('current ', current)
  return user?.user?.profile_id?.$oid !== PARTICIPANT_PROFILE_ID ? (
    <Container maxWidth='md'>
      <EditionHeaderStyles>
        <h1>{current.title}</h1>
        <Button color='secondary' onClick={async () => {
          await deleteEdition(current._id.$oid)
          Router.push('/')
          }}
        >
          <DeleteOutlineIcon />
        </Button>
        {/* {current.proof_ids.length === 0 && <Link href={`/edition/${current._id.$oid}/exam`}><Button color='primary' variant='contained'>+ Adicionar Prova</Button></Link>} */}
      </EditionHeaderStyles>
      <Card style={{ marginTop: '2rem', padding: '1rem 2rem 5rem' }}>
        <p>{current.description}</p>
        <p>Data de inicio: <Chip icon={<EventIcon />} color="primary" label={moment(current.start_date_time).format('DD/MM/YYYY HH:mm')} /></p>
        <p>Data de fim: <Chip icon={<EventIcon />} color="primary" label={moment(current.end_date_time).format('DD/MM/YYYY HH:mm')} /></p>
        <hr />
      <Box className={classes.root}>
        <Link href={`/edition/${current._id.$oid}/register`}>
          <Paper className={classes.paper} elevation={1}>
          Adicionar Registro
          <AddIcon />
        </Paper>
        </Link>
        <Link href={`/edition/${current._id.$oid}/register/students`}>
          <Paper className={classes.paper} elevation={1}>
            Estudantes
            <PeopleIcon />
          </Paper>
        </Link>
        <Link href={`/edition/${current._id.$oid}/exam`}>
          <Paper className={classes.paper} elevation={1}>
            Prova
            <AssessmentIcon />
          </Paper>
        </Link>
      </Box>
      </Card>
      {/* {current.proof_ids.length > 0 && (
        <>
        <h3>Prova</h3>
        <Card style={{ marginTop: '2rem', padding: '10px 2rem' }}>
          prova
        </Card>
      </>
      )} */}
      {/* <h3>Estudantes</h3>
      <Grid container xs={12}>
        <Grid item xs={6}>
            <Card style={{ minHeight: '514px', margin: '2rem 0.5rem 0 0', padding: '10px 2rem' }}>
              {current.registry_ids.map(registry => (
                <p>{registry?.$oid}</p>
              ))
              }
            </Card>
          </Grid>
      </Grid> */}
    </Container>
  ) : (
    <>
      <EditionHeaderStyles>
        <h1>{current.title}</h1>
      </EditionHeaderStyles>
      <Card style={{ marginTop: '2rem', padding: '10px 2rem' }}>
        <p>{current.description}</p>
        <p>Data de inicio: <Chip icon={<EventIcon />} color="primary" label={moment(current.start_date_time).format('DD/MM/YYYY HH:mm')} /></p>
        <p>Data de fim: <Chip icon={<EventIcon />} color="primary" label={moment(current.end_date_time).format('DD/MM/YYYY HH:mm')} /></p>
      </Card>
    </>
  )
}

export default Editions
