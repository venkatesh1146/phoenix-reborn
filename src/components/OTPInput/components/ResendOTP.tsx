/* eslint-disable @typescript-eslint/ban-types */
// Derived from the lib https://github.com/shubhanus/otp-input-react
// Added By: Venkatesh Pullaganti😁 (https://github.com/venkatesh1146)

import { styled } from '@linaria/react'
import PropTypes from 'prop-types'
import React, { CSSProperties } from 'react'

import { TextButton } from '~/components/Buttons'

import useResendOTP from '~/hooks/useResendOTP'

interface ResendOTPPropTypes {
  onTimerComplete?: Function
  onResendClick?: Function
  renderTime?: Function
  renderButton?: Function
  maxTime: number
  timeInterval?: number
  style: CSSProperties
  className?: string
}

function ResendOTP({
  renderTime,
  renderButton,
  style = {},
  className,
  maxTime = 60,
  timeInterval = 1000,
  ...props
}: ResendOTPPropTypes) {
  const { remainingTime, handelResendClick } = useResendOTP({
    ...props,
    maxTime,
    timeInterval,
  })
  return (
    <div
      className={className || ''}
      data-testid="otp-resend-root"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        ...style,
      }}
    >
      {renderTime ? (
        renderTime(remainingTime)
      ) : remainingTime > 0 ? (
        <ResendTxt>
          You can Request resend OTP after: {remainingTime} sec
        </ResendTxt>
      ) : (
        <></>
      )}
      {renderButton ? (
        renderButton({
          disabled: remainingTime !== 0,
          onClick: handelResendClick,
          remainingTime,
        })
      ) : remainingTime === 0 ? (
        <ResendTxt>
          Not received OTP yet ?{' '}
          <TextButton
            style={{ color: '#000', padding: '0', fontWeight: '500' }}
            onClick={handelResendClick}
          >
            Resend OTP
          </TextButton>
        </ResendTxt>
      ) : (
        <></>
      )}
    </div>
  )
}

ResendOTP.propTypes = {
  onTimerComplete: PropTypes.func,
  onResendClick: PropTypes.func,
  renderTime: PropTypes.func,
  renderButton: PropTypes.func,
  maxTime: PropTypes.number,
  timeInterval: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default ResendOTP

const ResendTxt = styled.p`
  font-size: 0.75rem;
`
