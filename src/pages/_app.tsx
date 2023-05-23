import { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

import { ToastConfig, ToastDesktopConfig } from '~/constants/toast.config'
import { isDesktop, useIsDesktop } from '~/hooks/useIsDesktop'

import '../styles/global'
import '../styles/globalCss.scss'

export default function App({ Component, pageProps }: AppProps) {
  const isDesktop = useIsDesktop()
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
      <Toaster
        containerStyle={
          !isDesktop
            ? {
                left: 0,
                right: 0,
                bottom: 0,
              }
            : {
                left: 0,
                right: 20,
                bottom: 0,
                top: 20,
              }
        }
        position={isDesktop ? 'top-right' : 'bottom-center'}
        toastOptions={isDesktop ? ToastDesktopConfig : ToastConfig}
      />
    </>
  )
}
