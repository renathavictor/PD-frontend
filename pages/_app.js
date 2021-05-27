import App from 'next/app'
import { Provider } from 'react-redux'
import 'moment/locale/pt-br'

import Page from '../components/Page'
// import store from '../store/configureStore'
import AuthState from '../context/auth/AuthState'
import AlertState from '../context/alert/AlertState'
import EditionState from '../context/editions/editionState'
import ExamState from '../context/exams/examState'
import setAuthToken from '../utils/setAuthToken'
import QuestionState from '../context/questions/questionState'
import RegisterState from '../context/register/registerState'

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
          <EditionState>
            <ExamState>
              <QuestionState>
                <RegisterState>
                  <Page>
                    <Component { ...pageProps } />
                  </Page>
                </RegisterState>
              </QuestionState>
            </ExamState>
          </EditionState>
        </AlertState>
      </AuthState>
    )
  }
}

export default MyApp
