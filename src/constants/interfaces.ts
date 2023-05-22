export interface FundMetaDataType {
  fundName: string
  amount: number
  units: number
}

export interface MFSwitchStatusResponseType {
  userid: string
  ticketNumber: string
  status: string
  clientName: string
  partnerName: string
  totalAmount: number
  partnerPhone: string
  schemes: EachFundSwitchType[]
}

export interface EachFundSwitchType {
  switchout: Switch
  switchin: Switch
  amcIconurl?: string
  error?: string
  valid?: boolean
  email?: string
  pan?: string
  customerApproved?: boolean
  kycCompleted?: boolean
  status?: string
  kycLink?: string
}

export interface Switch {
  fundName: string
  isin: string
  wschemecode: string
  units: number
  amount: number
  full: boolean
  folioNumber: string
}
