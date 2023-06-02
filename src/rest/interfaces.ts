export interface SendOTPRequestType {
  emails: string[]
  phone_numbers?: string[]
  reference_id: string
  user_id?: string
  template_name?: string
}

export interface VerifyOTPRequestType {
  email: string
  reference_id: string
  otp: number | string
  request_type: string
}

export interface ResendOTPRequestType {
  email: string
  reference_id: string
}
