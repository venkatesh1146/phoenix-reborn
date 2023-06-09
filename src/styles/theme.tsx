import { createTheming } from '@callstack/react-theme-provider'
import React from 'react'

export const lightTheme = {
  colors: {
    primary: '#6725f4',
    secondary: '#f8f4ff',
    primaryTextColor: '#1c1c1c',
    secondaryTextColor: '#7e7e7e',
    white: '#ffffff',
    primaryBgColor: '#1e1730',
    secondaryBgColor: '#3b2c62',
    lightBgColor: '#F6F2FF',
    disabledBgColor: '#C8C6CC',
  },
}

export type Theme = typeof lightTheme

export const {
  ThemeProvider: LinariaThemeProvider,
  withTheme,
  useTheme,
} = createTheming(lightTheme)

type ThemeProviderProps = {
  theme?: Theme
  children: JSX.Element
}

export const ThemeProvider = ({
  children,
  theme = lightTheme,
}: React.PropsWithChildren<ThemeProviderProps>): JSX.Element => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <LinariaThemeProvider theme={theme}>{children}</LinariaThemeProvider>
  )
}

type ThemeCallback<T> = (tm: T) => string

export const tm = (cb: ThemeCallback<Theme>) => () =>
  ((fn) => fn(useTheme()))(cb)
