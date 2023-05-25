/* eslint-disable @typescript-eslint/ban-types */
import { useState } from 'react'
import toast from 'react-hot-toast'

import { getErrorMessage } from '~/utils/ErrorUtils'

export default function useAsync(apiFunction: Function) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const makeApiCall = (
    reqObjet: Record<string, any>,
    onSuccess?: (res: any) => void,
    onFailure?: (err: Error) => {}
  ) => {
    setIsLoading(true)
    apiFunction(reqObjet)
      .then((res: any) => {
        setData(res)
        onSuccess && onSuccess(res)
      })
      .catch((err: Error) => {
        onFailure && onFailure(err)
        toast.error(getErrorMessage(err))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    isLoading,
    data,
    makeApiCall,
  }
}
