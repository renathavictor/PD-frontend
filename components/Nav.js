import React, { Fragment, useContext } from 'react'
import Link from 'next/link'
import { VscSignOut } from 'react-icons/vsc'

import AuthContext from '../context/auth/authContext'
import NavStyled from './styles/NavStyles'

const Nav = () => {
  const authContext = useContext(AuthContext)

  const { isAuthenticated, logout } = authContext

  const onLogout = () => {
    logout()
  }
  const authLinks = (
    <Fragment>
      <Link href='/'><a>home</a></Link>
      {/* <Link href='/me'><a>account</a></Link> */}
      <Link href='#!'><a onClick={onLogout}><VscSignOut /><span className='hide-sm'>logout</span></a></Link>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <Link href='/login'><a>login</a></Link>
      <Link href='/register'><a>register</a></Link>
    </Fragment>
  )

  return (
    <NavStyled>
      { isAuthenticated ? authLinks : guestLinks }
    </NavStyled>
  )
}

export default Nav
