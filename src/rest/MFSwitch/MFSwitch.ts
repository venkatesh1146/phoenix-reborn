import env from '~/utils/env'

import { transformedAxios } from '../axios'
import {
  ResendOTPRequestType,
  SendOTPRequestType,
  VerifyOTPRequestType,
} from '../interfaces'

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
  const url = `${BASE_URL}/proposals/api/v0/mf/status?proposal_id=${proposalId}`

  return queryClient.fetchQuery({
    queryFn: () => transformedAxios.get(url),
    queryKey: ['mf-switch-proposal-status'],
    staleTime: 15 * 1000,
  })
}