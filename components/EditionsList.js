import React, { useEffect, useContext } from 'react'
import { CircularProgress } from '@material-ui/core'
import Card from './EditionCard'
import { EditionsStyles } from './styles/EditionStyles'

import AuthContext from '../context/auth/authContext'
import EditionContext from '../context/editions/editionContext'

const EditionsList = () => {
  const authContext = useContext(AuthContext)
  const editionContext = useContext(EditionContext)
  const { isAuthenticated, loading } = authContext
  const { editions, getEditions, setCurrent, current, deleteEdition, updateEdition, error, clearCurrent } = editionContext

  useEffect(() => {
    authContext.loadUser()
    getEditions()

    if (!loading && !isAuthenticated) {
      Router.push('/login')
    }

    return () => {
      clearCurrent()
    }
  }, [])

  if (loading || !editions) return <CircularProgress />
  return (
    <EditionsStyles>
      { editions.map(edition => {
        return (
        <Card
          key={edition._id?.$oid}
          id={edition._id?.$oid}
          endDate={edition.end_date_time}
          startDate={edition.start_date_time}
          title={edition.title}
          description={edition.description}
        />
      )})}
    </EditionsStyles>
  )
}

export default EditionsList
