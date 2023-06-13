import { MutationOptions, useApolloClient } from '@apollo/client'
import React, { useState } from 'react'

interface Params extends Omit<MutationOptions, 'mutation' | 'fetchPolicy'> {
  onSuccess?: (data: any) => void
  onFailure?: (err: any) => void
}

interface StateType {
  data: null | Record<string, any>
  isLoading: boolean
  error: null | any
}

export default function useGqlMutation(props: MutationOptions) {
  const [state, setState] = useState<StateType>({
    data: null,
    isLoading: false,
    error: null,
  })
  const client = useApolloClient()

  const mutate = ({ onFailure, onSuccess, ...params }: Params) => {
    setState({
      ...state,
      isLoading: true,
    })
    client
      .mutate({
        ...props,
        ...params,
      })
      .then((res) => {
        onSuccess && onSuccess(res)
        setState({
          data: res,
          error: null,
          isLoading: false,
        })
      })
      .catch((err) => {
        onFailure && onFailure(err)
        setState({
          data: null,
          isLoading: false,
          error: err,
        })
      })
  }
  return {
    mutate,
    ...state,
  }
}
