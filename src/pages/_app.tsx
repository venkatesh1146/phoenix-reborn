import { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/global'
import '../styles/globalCss.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title> Wealth</title>
        <meta
          name="description"
          content="A simple project to work with NextJS, React, TypeScript and Styled-Components"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
