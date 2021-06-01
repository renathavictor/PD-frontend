import { CircularProgress } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

import EditionForm from '../../../components/form/EditionForm'
import AuthContext from '../../../context/auth/authContext'
import EditionContext from '../../../context/editions/editionContext'
import { PARTICIPANT_PROFILE_ID } from '../../../utils/constants'

const CreateEdition = ({ query }) => {
  const { id } = query
  const authContext = useContext(AuthContext)
  const editionContext = useContext(EditionContext)
  const { isAuthenticated, loading, user } = authContext
  const { getEdition, current, error, clearCurrent } = editionContext

  useEffect(() => {
    const getCurrent = async () => {
      await getEdition(id)
    }
    getCurrent()
  }, [])

  useEffect(() => {
    authContext.loadUser()
    if (!loading && !isAuthenticated) {
      Router.push('/login')
    }

  }, [isAuthenticated])

  if (loading || editionContext.loading) return <CircularProgress />

  return user?.user?.profile_id?.$oid !== PARTICIPANT_PROFILE_ID ? (
    <>
      <EditionForm
        current={current}
      />
    </>
  ) : <p>Não autorizado</p>
}

export default CreateEdition
