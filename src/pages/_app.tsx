import '../styles/global'
import '../styles/globalCss.scss'
// import '../styles/bootstrap.css'
import '../styles/metaforms.scss'

import { ApolloProvider } from '@apollo/client'
import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

import { ThemeProvider, lightTheme } from '~/styles/theme'
import WealthyApolloClient from '~/utils/ApolloUtils'

import { ToastConfig, ToastDesktopConfig } from '~/constants/toast.config'
import { useIsDesktop } from '~/hooks/useIsDesktop'
import useMFSwitchAuthToken from '~/hooks/useMFSwitchAuthToken'
import queryClient from '~/providers/queryClient'

const client = WealthyApolloClient

export default function App({ Component, pageProps }: AppProps) {
  const isDesktop = useIsDesktop()
  useMFSwitchAuthToken()

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider theme={lightTheme}>
          <ThemeProvider theme={lightTheme}>
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
          </ThemeProvider>
        </MuiThemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  )
}
