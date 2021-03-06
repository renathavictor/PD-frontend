import Link from 'next/link'
import styled from 'styled-components'
import Router from 'next/router'
import NProgress from 'nprogress'

import Nav from './Nav'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}
Router.onRouteChangeError = () => {
  NProgress.done()
}


const Logo = styled.h1`
  font-size: 3.5rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background-image: linear-gradient(to bottom, ${props => props.theme.secundary} 0%, ${props => props.theme.primary} 100%);
    color: #FFF;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey}
  }
`

const Header = () => (
  <StyledHeader>
    <div className='bar'>
      <Logo>
        <Link href='/'><a>Olímpia Digital</a></Link>
      </Logo>
      <Nav />
    </div>
    <div className='sub-bar'>
      {/* <p>Busca</p> */}
    </div>
  </StyledHeader>
)

export default Header
