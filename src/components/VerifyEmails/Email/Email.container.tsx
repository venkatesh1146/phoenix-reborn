import { styled } from '@linaria/react'
import React, { useState } from 'react'

import {
  OutlinedButton,
  PrimaryButton,
  RoundButton,
  TextButton,
} from '~/components/Buttons'
import Footer from '~/components/Footer'
import Image from '~/components/Image'
import OtpInput from '~/components/OTPInput'
import ResendOTP from '~/components/OTPInput/components/ResendOTP'

import { WealthyImages } from '~/assets'

interface EmailPropTypes {
  email: string
  isVerified: boolean
  onVerify?: (email: string) => void
  className?: string
}

export default function EmailContainer({
  email,
  isVerified,
  onVerify,
  className = '',
}: EmailPropTypes) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [otp, setOtp] = useState('')

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const onClickVerify = () => {
    // request otp
    toggleIsExpanded()
  }

  const resendOtp = () => {
    //pass
  }

  const renderButtonBasedOnStatus = () => {
    if (isVerified)
      return (
        <>
          <Image width={'1.375rem'} src={WealthyImages.tickWithBgDesign} />
        </>
      )
    else if (isExpanded)
      return (
        <TextButton
          style={{ color: '#000000', padding: 0 }}
          onClick={toggleIsExpanded}
        >
          Cancel
        </TextButton>
      )
    else
      return (
        <TextButton style={{ padding: 0 }} onClick={onClickVerify}>
          Verify
        </TextButton>
      )
  }

  return (
    <Wrapper className={`email-wrapper ${className}`} isExpanded={isExpanded}>
      <EmailAndButton>
        <Image
          style={{ marginRight: '0.8rem' }}
          src={WealthyImages.emailIconSecondaryColor}
        />
        <EmailTxt>{email}</EmailTxt>
        {renderButtonBasedOnStatus()}
      </EmailAndButton>
      {isExpanded ? (
        <>
          <Text style={{ color: '#7E7E7E' }}>
            We have sent an OTP to above email
          </Text>
          <OtpInput
            value={otp}
            onChange={setOtp}
            OTPLength={6}
            inputType={'number'}
          />
          <ResendOTP style={{}} maxTime={30} onResendClick={resendOtp} />
          <RoundButton
            disabled={otp.length !== 6}
            onClick={resendOtp}
            style={{ fontWeight: '600' }}
          >
            Confirm OTP
          </RoundButton>
        </>
      ) : (
        <></>
      )}
    </Wrapper>
  )
}

const EmailAndButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const Text = styled.p`
  font-size: 0.875rem;
`

const Wrapper = styled.div<{ isExpanded: boolean }>`
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 1.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  height: ${(props) => (props.isExpanded ? '11.25rem' : '2.75rem')};
  transition: height 0.1s cubic-bezier(0.89, -0.11, 1, 1);
  .otp-input-component {
    max-width: 60px;
  }
`
const EmailTxt = styled.p`
  margin-right: auto;
  font-family: 'Maven Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 16px;

  color: #000000;
`
const VerifiedTxt = styled.p`
  color: #61bf5f;
  font-family: 'Maven Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 0.85rem;
  margin-left: 0.5rem;
`
