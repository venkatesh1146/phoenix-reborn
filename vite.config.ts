/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve as pathResolve } from 'path'

import linaria from '@linaria/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const resolve = (path: string) => pathResolve(__dirname, path)

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    linaria({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
  ],
  resolve: {
    alias: {
      '~': resolve('src'),
    },
  },
})
