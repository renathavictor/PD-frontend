import React, { Component } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import Header from './Header'
import Footer from './Footer'
import Meta from './Meta'
import Alerts from './Alerts'

const theme = {
  primary: '#004A94',
  secundary: '#43C3DD',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  danger: '#DC3545',
  success: '#42CD45',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
}

const StyledPage = styled.div`
  background: #FFF;
  color: ${props => props.theme.black};
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/radnikanext-medium-webfont.woff2')
    format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`

class Page extends Component {

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <StyledPage>
            <Meta />
            <Header />
            <Inner>
              <Alerts />
              {this.props.children}
            </Inner>
            {/* <Footer /> */}
          </StyledPage>
        </ThemeProvider>
      </>
    )
  }
}

export default Page