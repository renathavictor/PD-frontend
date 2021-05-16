import React, { useEffect } from 'react'

const Editions = ({ query }) => {
  const { id } = query
  console.log(id)
  useEffect(() => {
    // TODO
    // pegar a edição atual com o id que vem no param
  }, [])
  return (
    <div>
      tela da edition id
    </div>
  )
}

export default Editions
