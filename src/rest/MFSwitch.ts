import { transformedAxios } from './axios'
import {
  ResendOTPRequestType,
  SendOTPRequestType,
  VerifyOTPRequestType,
} from './interfaces'

const sendOTP = (req: SendOTPRequestType) => {
  const url = '/approval/api/v0/sendOTP'
  return transformedAxios.post(url, req)
}

const verifyOTP = (req: VerifyOTPRequestType) => {
  const url = '/approval/api/v0/verifyOTP'
  return transformedAxios.post(url, req)
}

const resendOTP = (req: ResendOTPRequestType) => {
  const url = '/approval/api/v0/resendOTP'
  return transformedAxios.post(url, req)
}

const getProposalStatus = (proposalId: string) => {
  const url = `proposals/api/v0/mf/status?proposal_id=${proposalId}`
  return transformedAxios.get(url)
}

export default {
  sendOTP,
  verifyOTP,
  resendOTP,
  getProposalStatus,
}
