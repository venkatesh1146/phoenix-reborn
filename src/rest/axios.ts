import axios, { AxiosInstance } from 'axios'
import humps from 'humps'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['X-APP-VERSION'] = 'custom-switcher'

const transformedAxios: AxiosInstance = axios.create({})

transformedAxios.defaults.transformResponse = [
  ...(axios.defaults.transformResponse as any),
  (data) => humps.camelizeKeys(data),
]

transformedAxios.defaults.transformRequest = [
  (data) => humps.decamelizeKeys(data),
  ...(axios.defaults.transformRequest as any),
]

export { transformedAxios }
