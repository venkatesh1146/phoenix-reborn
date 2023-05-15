import { styled } from '@linaria/react'
import React, { useState } from 'react'

import OtpInput from '../../components/OTPInput'
import FundsCountWithAmount from '../FundsCountWithAmount/FundsCountWithAmount'

export default function ProposalPage() {
  const [otp, updateOtp] = useState<string | undefined>()
  return (
    <Wrapper>
      <FundsCountWithAmount />
      <OtpInput
        OTPLength={6}
        otpType={'number'}
        onChange={updateOtp}
        value={otp}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  padding: 1.5rem;
  background: #ffffff;
`
