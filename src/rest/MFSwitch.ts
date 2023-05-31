import humps from 'humps'

import env from '~/utils/env'

import data from '../hooks/MockResponse.json'

import { transformedAxios } from './axios'
import {
  ResendOTPRequestType,
  SendOTPRequestType,
  VerifyOTPRequestType,
} from './interfaces'

import queryClient from '~/providers/queryClient'

const BASE_URL = env.QUIENJET_URL

export const sendOTP = (req: SendOTPRequestType) => {
  const url = `${BASE_URL}/otp-flow/api/v0/send-otp`
  return transformedAxios.post(url, req)
}

export const verifyOTP = (req: VerifyOTPRequestType) => {
  const url = `${BASE_URL}/otp-flow/api/v0/verify-otp`
  return transformedAxios.post(url, req)
}

export const resendOTP = (req: ResendOTPRequestType) => {
  const url = `${BASE_URL}/otp-flow/api/v0/resend-otp`
  return transformedAxios.post(url, req)
}

export const getProposalStatus = (proposalId: string) => {
  const url = `https://api.wealthydev.in/quinjet/proposals/api/v0/mf/status?proposal_id=${proposalId}`
  const config = {
    headers: {
      Authorization:
        'fa6c41b6-c8f2-4a08-912d-afc9d4838662:GGbDKj0DXwYwu5VdG7G1Ds3Ap',
    },
  }
  return new Promise((r, rej) => {
    setTimeout(() => {
      r({
        data: humps.camelizeKeys(data),
      })
    }, 1000)
  })

  // return queryClient.fetchQuery({
  //   queryFn: () => transformedAxios.get(url, config),
  //   queryKey: ['mf-switch-proposal-status'],
  //   staleTime: 15 * 1000,
  // })
}
