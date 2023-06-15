import { createTheming } from '@callstack/react-theme-provider'
import { Theme, createTheme } from '@mui/material'
import React from 'react'

interface ThemeType extends Theme {
  colors: typeof colors
}

const colors = {
  primary: '#6725f4',
  secondary: '#f8f4ff',
  primaryTextColor: '#1c1c1c',
  secondaryTextColor: '#7e7e7e',
  white: '#ffffff',
  primaryBgColor: '#1e1730',
  secondaryBgColor: '#3b2c62',
  lightBgColor: '#F6F2FF',
  disabledBgColor: '#C8C6CC',
}

const ColorsStyles = {
  '.MuiOutlinedInput-root': {
    '&:hover': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--primary-color)',
      },
    },
    '&.Mui-error': {
      '&:hover': {
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: '#d32f2f',
        },
      },
    },
    '&.Mui-focused': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--primary-color)',
      },
    },
  },
  '.MuiFormLabel-root': {
    '&.Mui-focused': {
      color: 'var(--primary-color)',
    },
    '&.Mui-error': {
      color: '#d32f2f',
    },
  },
}

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#6725f4',
    },
  },
  typography: {
    fontFamily: 'Lato',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ColorsStyles,
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: ColorsStyles,
      },
    },
  },
})

export const lightTheme = {
  ...muiTheme,
  colors,
}

export const {
  ThemeProvider: LinariaThemeProvider,
  withTheme,
  useTheme,
} = createTheming(lightTheme)

type ThemeProviderProps = {
  theme?: ThemeType
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

export const tm = (cb: ThemeCallback<ThemeType>) => () =>
  ((fn) => fn(useTheme()))(cb)
