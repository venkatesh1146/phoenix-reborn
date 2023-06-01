import React, { useState } from 'react'

import { RoundButton, TextButton } from '~/components/Base/Buttons'
import Image from '~/components/Base/Image'
import OtpInput from '~/components/OTPInput'
import ResendOTP from '~/components/OTPInput/components/ResendOTP'
import Spinner from '~/components/Spinner'
import { useTheme } from '~/styles/theme'
import { handleApiError } from '~/utils/ErrorUtils'

import { EmailAndButton, EmailTxt, EmailWrapper } from '../styledComponents'

import { WealthyImages } from '~/assets'
import useRestApi from '~/hooks/useRestApi'
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

  const { isLoading: isSendOtpLoading, doApiCall: handleSentOTP } = useRestApi({
    apiFunction: sendOTP,
  })

  const { isLoading: isResendOTPLoading, doApiCall: handleResendOTP } =
    useRestApi({ apiFunction: resendOTP })

  const { isLoading: isVerifyOTPLoading, doApiCall: handleVerifyOTP } =
    useRestApi({ apiFunction: verifyOTP })

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const onClickVerify = () => {
    handleResendOTP(
      {
        email: email,
        reference_id: proposalId,
      },
      {
        onSuccess: () => {
          setIsExpanded(true)
        },
        onError: (error: any) => handleApiError(error),
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
      {
        onSuccess: () => {
          onVerify && onVerify(email)
        },
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
          style={{ color: '#000000', padding: 0, marginLeft: '0.5rem' }}
          onClick={toggleIsExpanded}
        >
          Cancel
        </TextButton>
      )
    else
      return (
        <TextButton
          style={{ padding: 0, marginLeft: '0.5rem' }}
          onClick={onClickVerify}
        >
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
