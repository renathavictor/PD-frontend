import { CircularProgress } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import EditionForm from '../../components/form/EditionForm'
import AuthContext from '../../context/auth/authContext'
import { PARTICIPANT_PROFILE_ID } from '../../utils/constants'

const CreateEdition = () => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, loading, user } = authContext

  useEffect(() => {
    authContext.loadUser()
    if (!loading && !isAuthenticated) {
      Router.push('/login')
    }

  }, [isAuthenticated])

  if (loading) return <CircularProgress />

  return user?.user?.profile_id?.$oid !== PARTICIPANT_PROFILE_ID ? (
    <>
    <h3><ArrowBackIosIcon style={{ cursor: 'pointer' }} onClick={() => Router.back()} />Criar Nova Edição</h3>
      <EditionForm />
    </>
  ) : <p>Não autorizado</p>
}

export default CreateEdition
