import { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/global'
import { theme } from '~/styles'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Build Wealth</title>

        <meta
          name="description"
          content="A simple project to work with NextJS, React, TypeScript and Styled-Components"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
