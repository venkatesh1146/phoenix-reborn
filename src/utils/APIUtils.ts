import humps from 'humps'

export const resolveWithTimeout = (response: any, timeout = 1000) => {
  return new Promise((r, _) => {
    setTimeout(() => {
      r({
        data: humps.camelizeKeys(response),
      })
    }, timeout)
  })
}
export const rejectWithTimeout = (timeout = 1000) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('Error')
    }, timeout)
  })
}
