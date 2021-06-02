import React, { useEffect, useContext, useState } from 'react'
import Router from 'next/router'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import RegisterContext from '../../../../context/register/registerContext'
import AuthContext from '../../../../context/auth/authContext'
import { PARTICIPANT_PROFILE_ID } from '../../../../utils/constants'
import Table from '../../../../components/Table'

const Students = ({ query }) => {
  const { id } = query
  const [editionRegisters, setEditionRegisters] = useState([])
  const authContext = useContext(AuthContext) || {}
  const registerContext = useContext(RegisterContext) || {}
  const { getRegisters, loading, registers } = registerContext

  const { user, isAuthenticated } = authContext

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      Router.push('/login')
    }
    const loadRegisters = async () => {
      await getRegisters()
    }
    loadRegisters()
  }, [])

  useEffect(() => {
    const loadRegister = async () => {
      const registerFilter = await registers?.filter(register => register?.edition_id.$oid === id)
      setEditionRegisters(registerFilter)
    }
    loadRegister()
  }, [registers])

  return user?.user?.profile_id?.$oid !== PARTICIPANT_PROFILE_ID ? (
    <div>
      <h2><ArrowBackIosIcon style={{ cursor: 'pointer' }} onClick={() => Router.back()} />Estudantes</h2>
      <Table
        data={editionRegisters}
        request='users'
      />
      {/* {editionRegisters?.map(register => (
        <p>{register.user_id.$oid}</p>
      ))} */}
    </div>
  ) : <p>Não autorizado</p>
}

export default Students
