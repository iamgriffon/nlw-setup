import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon"/>
        </Head>
          <body className='bg-theme text-white'>
            <Main />
            <NextScript />
          </body>
      </Html>
    )
  }
}