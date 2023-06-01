export interface SendOTPRequestType {
  emails: string[]
  phoneNumbers: string[]
  referenceid: string
  userid: string
  templateName: string
}

export interface VerifyOTPRequestType {
  email: string
  reference_id: string
  otp: number | string
}

export interface ResendOTPRequestType {
  email: string
  reference_id: string
}
