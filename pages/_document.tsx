import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <div id="modal-root"></div>
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }
  render(): JSX.Element {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript>
            <Script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" />
          </NextScript>
        </body>
      </Html>
    );
  }
}
