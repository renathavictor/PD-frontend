import App from 'next/app'
import { Provider } from 'react-redux'

import Page from '../components/Page'
// import store from '../store/configureStore'
import AuthState from '../context/auth/AuthState'
import AlertState from '../context/alert/AlertState'
import setAuthToken from '../utils/setAuthToken'

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (typeof window !== 'undefined' && localStorage) {
      localStorage.credentials && setAuthToken(localStorage.credentials)
    }
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    //  this exposes the query to the user
    pageProps.query = ctx.query
    return { pageProps }
  }

  render() {

    const { Component, pageProps } = this.props

    return (
      <AuthState>
        <AlertState>
          <Page>
            <Component { ...pageProps } />
          </Page>
        </AlertState>
      </AuthState>
    )
  }
}

export default MyApp
