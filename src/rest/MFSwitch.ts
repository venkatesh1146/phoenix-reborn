import { transformedAxios } from './axios'
import {
  ResendOTPRequestType,
  SendOTPRequestType,
  VerifyOTPRequestType,
} from './interfaces'

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/quinjet`

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
  const url = `${BASE_URL}/api/v0/mf/status/?proposal_id=${proposalId}`
  const config = {
    headers: {
      Authorization:
        '3da15256-a435-455d-bad9-8af927159321:LYgwEBLlwZpTAzHOM-N7jYOrHq8',
    },
  }
  return transformedAxios.get(url, config)
}
