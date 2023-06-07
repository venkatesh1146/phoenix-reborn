/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { AxiosHeaders } from 'axios'

import WealthyEnv from '~/utils/env'

import { transformedAxios as axios } from './axios'

import UrlConstants from '~/constants/UrlConstants'

const getAuthFromToken = (token: string) => {
  const url = UrlConstants.API_FETCH_INTERNAL_TOKEN_DETAILS
  axios.defaults.headers.common['X-APP-VERSION'] = 'web'
  return axios({
    method: 'post',
    url,
    data: { authorization_token: token },
  })
}

const checkToken = (
  auth: string | number | boolean | AxiosHeaders | string[] | null | undefined
) => {
  const url = `${WealthyEnv.GATE_API_URL}/wealthyauth/m/v0/check-token/`
  axios.defaults.headers.common['Authorization'] = auth
  return axios({
    method: 'get',
    url,
  })
}

const submitTwoFa = (
  pin = '123456',
  auth: string | number | boolean | AxiosHeaders | string[] | null | undefined
) => {
  axios.defaults.headers.common['Authorization'] = auth
  const url = `${WealthyEnv.GATE_API_URL}/wealthyauth/m/v0/login/submit-twofa/`
  return axios({
    method: 'post',
    url,
    data: { pin },
  })
}

export { getAuthFromToken, checkToken, submitTwoFa }
