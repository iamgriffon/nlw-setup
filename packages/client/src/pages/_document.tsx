import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        </Head>
          <body className='bg-theme text-white'>
            <Main />
            <NextScript />
          </body>
      </Html>
    )
  }
}