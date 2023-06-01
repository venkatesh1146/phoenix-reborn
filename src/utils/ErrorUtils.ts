/**
 Author - Harkirat Saluja
 Git - https://bitbucket.org/salujaharkirat/
 **/

import toast from 'react-hot-toast'

const SERVER_ERROR_KEYWORDS = [
  'HTTPSConnectionPool',
  "'str' object has no attribute 'get'",
  'Request failed with status code 400',
  "`<class 'NoneType'>`",
]

export const getErrorMessage = (error: any) => {
  const defaultMessage = 'Something went wrong... Please try again'

  if (error?.response?.data?.errorMessage) {
    return error?.response?.data?.errorMessage
  }

  // graphql errors
  if (error?.data?.errors[0]?.message) return error?.data?.errors[0]?.message

  if (!error.response || !error.response.data || !error.response.data.errors) {
    return defaultMessage
  }

  const { errors } = error.response.data

  if (!errors || !errors.length) {
    return defaultMessage
  }

  let errorMsg = errors[0].error_message

  if (error && error.message) {
    errorMsg = error.message
  }
  if (error && error.response && error.response.message) {
    errorMsg = error.message
  }
  if (error && error.response && error.response.data) {
    if (error.response.data.message) {
      errorMsg = error.response.data.message
    } else {
      errorMsg = error.response.data
    }
  }

  if (SERVER_ERROR_KEYWORDS.some((kw) => errorMsg.includes(kw))) {
    return defaultMessage
  }

  return errors[0].error_message || defaultMessage
}

export const handleApiError = (error: Error) => {
  const msg = getErrorMessage(error)
  toast.error(msg)
}
