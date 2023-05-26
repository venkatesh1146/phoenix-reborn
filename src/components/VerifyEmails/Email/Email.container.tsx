import React, { useState } from 'react'

import { RoundButton, TextButton } from '~/components/Base/Buttons'
import Image from '~/components/Base/Image'
import OtpInput from '~/components/OTPInput'
import ResendOTP from '~/components/OTPInput/components/ResendOTP'
import Spinner from '~/components/Spinner'
import { useTheme } from '~/styles/theme'

import { EmailAndButton, EmailTxt, EmailWrapper } from '../styledComponents'

import { WealthyImages } from '~/assets'
import useAsync from '~/hooks/useAsync'
import { resendOTP, sendOTP, verifyOTP } from '~/rest/MFSwitch'

interface EmailPropTypes {
  email: string
  isVerified: boolean
  onVerify?: (email: string) => void
  className?: string
  proposalId: string
  userId: string
}

export default function EmailContainer({
  email,
  isVerified,
  onVerify,
  className = '',
  proposalId,
  userId,
}: EmailPropTypes) {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [otp, setOtp] = useState('')

  const { isLoading: isSendOtpLoading, makeApiCall: handleSentOTP } =
    useAsync(sendOTP)

  const { isLoading: isResendOTPLoading, makeApiCall: handleResendOTP } =
    useAsync(resendOTP)

  const { isLoading: isVerifyOTPLoading, makeApiCall: handleVerifyOTP } =
    useAsync(verifyOTP)

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const onClickVerify = () => {
    handleSentOTP(
      {
        emails: [email],
        phoneNumbers: [],
        referenceid: proposalId,
        templateName: 'TEMPLATE_1',
        userid: userId,
      },
      () => {
        setIsExpanded(true)
      }
    )
  }

  const resendOtp = () => {
    handleResendOTP({
      email,
      referenceid: proposalId,
    })
  }

  const handleVerify = () => {
    handleVerifyOTP(
      {
        email,
        referenceid: proposalId,
        otp: parseInt(otp),
      },
      () => {
        onVerify && onVerify(email)
      }
    )
  }

  const renderButtonBasedOnStatus = () => {
    if (isVerified)
      return (
        <>
          <Image
            alt="verified"
            width={22}
            height={22}
            src={WealthyImages.tickWithBgDesign}
          />
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
          {isSendOtpLoading ? <Spinner /> : 'Verify'}
        </TextButton>
      )
  }

  return (
    <EmailWrapper
      className={`email-wrapper ${className}`}
      isExpanded={isExpanded}
    >
      <EmailAndButton>
        <Image
          alt="email"
          width={22}
          height={22}
          style={{ marginRight: '0.8rem' }}
          src={WealthyImages.emailIconSecondaryColor}
        />
        <EmailTxt>{email}</EmailTxt>
        {renderButtonBasedOnStatus()}
      </EmailAndButton>
      {isExpanded ? (
        <>
          <EmailTxt style={{ color: theme.colors.secondaryTextColor }}>
            We have sent an OTP to above email
          </EmailTxt>
          <OtpInput
            value={otp}
            onChange={setOtp}
            OTPLength={6}
            inputType={'number'}
          />
          <ResendOTP style={{}} maxTime={30} onResendClick={resendOtp} />
          <RoundButton
            disabled={otp.length !== 6 || isResendOTPLoading}
            onClick={handleVerify}
            style={{ fontWeight: '600' }}
          >
            {isResendOTPLoading || isVerifyOTPLoading ? (
              <Spinner />
            ) : (
              'Confirm OTP'
            )}
          </RoundButton>
        </>
      ) : (
        <></>
      )}
    </EmailWrapper>
  )
}
