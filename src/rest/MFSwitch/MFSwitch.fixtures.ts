import humps from 'humps'

import { resolveWithTimeout } from '~/utils/APIUtils'
import env from '~/utils/env'

import MFStatusFixture from '../../hooks/MockResponse.json'
import { transformedAxios } from '../axios'
import {
  ResendOTPRequestType,
  SendOTPRequestType,
  VerifyOTPRequestType,
} from '../interfaces'

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
  return resolveWithTimeout(humps.camelizeKeys(MFStatusFixture))
}
