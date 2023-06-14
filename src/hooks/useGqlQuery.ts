import { QueryOptions, useApolloClient } from '@apollo/client'
import React, { useState } from 'react'

import { handleApiError } from '~/utils/ErrorUtils'

interface useGqlQueryPropTypes extends QueryOptions {
  onSuccess?: (data: any) => void
  onFailure?: (error: any) => void
  showErrorToast?: boolean
}

interface StateType {
  data: null | Record<string, any> | any
  isLoading: boolean
  error: null | any
}

export default function useGqlQuery({
  onSuccess = (data) => {},
  onFailure = (err) => {},
  showErrorToast = false,
  ...rest
}: useGqlQueryPropTypes) {
  const [state, setState] = useState<StateType>({
    data: null,
    isLoading: false,
    error: null,
  })
  const client = useApolloClient()

  const fetchData = () => {
    setState({
      ...state,
      isLoading: true,
    })

    client
      .query(rest)
      .then((res) => {
        onSuccess(res)
        setState({
          data: res,
          error: null,
          isLoading: false,
        })
      })
      .catch((err) => {
        onFailure(err)
        showErrorToast && handleApiError(err)
        setState({
          data: null,
          isLoading: false,
          error: err,
        })
      })
  }

  return {
    ...state,
    fetchData,
  }
}
