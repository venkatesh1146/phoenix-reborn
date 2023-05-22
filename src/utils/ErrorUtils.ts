/**
 Author - Harkirat Saluja
 Git - https://bitbucket.org/salujaharkirat/
 **/

import { AxiosError } from 'axios'

const SERVER_ERROR_KEYWORDS = [
  'HTTPSConnectionPool',
  "'str' object has no attribute 'get'",
  'Request failed with status code 400',
  "`<class 'NoneType'>`",
]

export const getErrorMessage = (error: any) => {
  const defaultMessage = 'Something went wrong... Please try again'

  // graphql errors
  if (error?.data?.errors[0]?.message) return error?.data?.errors[0]?.message

  if (!error.response || !error.response.data || !error.response.data.errors) {
    return defaultMessage
  }

  const { errors } = error.response.data

  if (!errors || !errors.length) {
    return defaultMessage
  }
  const errorMsg = errors[0].error_message

  if (SERVER_ERROR_KEYWORDS.some((kw) => errorMsg.includes(kw))) {
    return defaultMessage
  }

  return errors[0].error_message || defaultMessage
}
