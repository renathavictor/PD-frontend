import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'

import AuthContext from '../context/auth/authContext'
import EditionsList from './EditionsList'
import { Button, CircularProgress } from '@material-ui/core'
import { PARTICIPANT_PROFILE_ID } from '../utils/constants'

// isso ir para oarquivo do card
const HomeStyles = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5rem;

  button {
    padding: 1.5rem;
    background-color: ${props => props.theme.primary};
    border: 1px solid ${props => props.theme.primary};
    border-radius: 3px;
    color: ${props => props.theme.offWhite};
    cursor: pointer;
    &:hover {
      background-color:  ${props => props.theme.offWhite};
      border: 1px solid ${props => props.theme.primary};
      color: ${props => props.theme.primary};
    }
  }
`

const ContainerHome = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5rem;
`

const Home = () => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, loading, user } = authContext

  useEffect(() => {
    authContext.loadUser()
    if (!loading && !isAuthenticated) {
      Router.push('/login')
    }

  }, [isAuthenticated])

  if (loading) return <CircularProgress />

  return isAuthenticated ? (
    <div>
      <h3>Hi, { user && user?.user.name }</h3>
      {/* TODO - botão apenas para admin */}
      {
        user?.user.profile_id.$oid !== PARTICIPANT_PROFILE_ID &&
        <Link href='/edition/create-edition'><Button color='primary' variant='contained'>+ Adicionar Edição</Button></Link>
      }
      <HomeStyles>
        <EditionsList />
      </HomeStyles>
    </div>
  ) : <div>No permission to access this page</div>
}

export default Home
