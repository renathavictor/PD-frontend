import React, { useEffect, useContext } from 'react'
import Link from 'next/link'

import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core'

import EditionContext from '../../context/editions/editionContext'

const Editions = ({ query }) => {
  const { id } = query
  const editionContext = useContext(EditionContext)
  const { getEdition, loading, current, updateEdition, error, clearCurrent } = editionContext

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

  return (
    <div>
      <h1>{current.title}</h1>
      <Link href={`/edition/${current._id.$oid}/create-exam`}><Button color='primary' variant='contained'>+ Adicionar Prova</Button></Link>
    </div>
  )
}

export default Editions
