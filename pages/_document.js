import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const materialUiSheets = new MaterialUiServerStyleSheets()

    const page = renderPage(App => props => sheet.collectStyles(
      materialUiSheets.collect(<App {...props} />)
    ))
    const styleTags = sheet.getStyleElement()
    const styleTagsMaterial = materialUiSheets.getStyleElement()
    return { ...page, styleTags, styleTagsMaterial }
  }

  render() {
    return (
      <Html>
        <Head>
        {this.props.styleTags}
        {this.props.styleTagsMaterial}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
