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
import EditIcon from '@material-ui/icons/Edit'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import EditionContext from '../../context/editions/editionContext'
import AuthContext from '../../context/auth/authContext'
import ExamContext from '../../context/exams/examContext'

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
  },
  chip: {
    marginLeft: '1rem',
    padding: '0 10px'
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
  const examContext = useContext(ExamContext)
  const { getEdition, loading, current, deleteEdition, error, clearCurrent } = editionContext
  const { user, isAuthenticated } = authContext
  const [userEditionRegister, setUserEditionRegister] = React.useState({})

  if (loading) return <CircularProgress />

  useEffect(() => {
    const getCurrent = async () => {
      await getEdition(id)
    }
    getCurrent()
  }, [])

  useEffect(() => {
    if (user?.user?.profile_id?.$oid === PARTICIPANT_PROFILE_ID) {
      const userEditionRegisterFilter = current?.registry_ids.map(edition => {
        const filter = user.user.registry_ids && user.user.registry_ids[user.user.registry_ids.findIndex(x => {
          return x.$oid === edition.$oid
        })]
        return filter && filter
      })
      setUserEditionRegister(userEditionRegisterFilter?.filter(x => x !== undefined)[0])
    }
    current?.proof_ids[0]?.$oid && examContext.getExam(current.proof_ids[0].$oid)
  }, [current])

  if (!current && !loading) return ''

  return user?.user?.profile_id?.$oid !== PARTICIPANT_PROFILE_ID ? (
    <Container maxWidth='md'>
      <EditionHeaderStyles>
        <h1><ArrowBackIosIcon style={{ cursor: 'pointer' }} onClick={() => Router.back()} /> {current.title}</h1>
        <div>
          <Button color='primary' onClick={() => Router.push(`/edition/${current._id.$oid}/edit`)}>
            <EditIcon />
          </Button>
          <Button color='secondary' onClick={async () => {
            await deleteEdition(current._id.$oid)
            Router.push('/')
          }}
          >
            <DeleteOutlineIcon />
          </Button>
        </div>
        {/* {current.proof_ids.length === 0 && <Link href={`/edition/${current._id.$oid}/exam`}><Button color='primary' variant='contained'>+ Adicionar Prova</Button></Link>} */}
      </EditionHeaderStyles>
      <Card style={{ marginTop: '2rem', padding: '1rem 2rem 5rem' }}>
        <p>{current.description}</p>
        <div style={{ marginBottom: '1rem' }}>Data de inicio: <Chip className={classes.chip} icon={<EventIcon />} color="primary" label={moment(current.start_date_time).format('DD/MM/YYYY HH:mm')} /></div>
        <div style={{ marginBottom: '1rem' }}>Data de fim: <Chip className={classes.chip} icon={<EventIcon />} color="primary" label={moment(current.end_date_time).format('DD/MM/YYYY HH:mm')} /></div>
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
        <Link href={`/edition/${current._id.$oid}/exam/${current.proof_ids?.length > 0 ? current.proof_ids[0].$oid : 'new'}`}>
          <Paper className={classes.paper} elevation={1}>
            Prova
            <AssessmentIcon />
          </Paper>
        </Link>
      </Box>
      </Card>
    </Container>
  ) : (
    <>
      <EditionHeaderStyles>
        <h1><ArrowBackIosIcon style={{ cursor: 'pointer' }} onClick={() => Router.back()} />{current.title}</h1>
      </EditionHeaderStyles>
      <Card style={{ marginTop: '2rem', padding: '1rem 2rem' }}>
        <p>{current.description}</p>
        <div style={{ marginBottom: '1rem' }}>Data de inicio: <Chip className={classes.chip} icon={<EventIcon />} color="primary" label={moment(current.start_date_time).format('DD/MM/YYYY HH:mm')} /></div>
        <div style={{ marginBottom: '1rem' }}>Data de fim: <Chip className={classes.chip} icon={<EventIcon />} color="secondary" label={moment(current.end_date_time).format('DD/MM/YYYY HH:mm')} /></div>
        <hr style={{ marginTop: '1rem' }} />
        {current.proof_ids[0].$oid && examContext.current && userEditionRegister && <>
          <h3>Prova</h3>
          <div style={{ marginBottom: '1rem' }}>Data de inicio: <Chip className={classes.chip} icon={<EventIcon />} color="primary" label={moment(examContext.current.start_date_time).format('DD/MM/YYYY HH:mm')} /></div>
          <div style={{ marginBottom: '1rem' }}>Data de fim: <Chip className={classes.chip} icon={<EventIcon />} color="secondary" label={moment(examContext.current.end_date_time).format('DD/MM/YYYY HH:mm')} /></div>
         <Button style={{ margin: '2rem auto' }} color='primary' variant='contained' onClick={() => {
          Router.push({
            pathname: `/edition/${current._id.$oid}/exam/${current.proof_ids[0].$oid}`,
            query: { registerId: userEditionRegister?.$oid }
          })
          }}
          disabled={moment().isAfter(examContext.current.end_date_time)}
        >
          Acessar a prova
        </Button>
        </>}
      </Card>
    </>
  )
}

export default Editions
