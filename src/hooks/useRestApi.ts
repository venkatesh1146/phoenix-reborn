/* eslint-disable @typescript-eslint/ban-types */

// Author: @venkatesh1146 😉
// Github : https://github.com/venkatesh1146

import {
  MutationFunction,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query'
import React from 'react'

interface Props<TData, TError, TVariables, TContext> {
  apiFunction: MutationFunction<TData, TVariables>
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn'
  >
}

function useRestApi<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
>(props: Props<TData, TError, TVariables, TContext>) {
  const { apiFunction, options } = props

  const { mutate, mutateAsync, ...rest } = useMutation(apiFunction, options)

  return { ...rest, doApiCall: mutate, doAPiCallAsync: mutateAsync }
}

export default useRestApi
