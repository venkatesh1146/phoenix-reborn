/* eslint-disable @typescript-eslint/ban-types */

// Derived from the lib https://github.com/shubhanus/otp-input-react
// Added By: Venkatesh Pullaganti😁 (https://github.com/venkatesh1146)

import { useEffect, useRef, useState } from 'react'

interface useResendOTPProps {
  maxTime: number
  onTimerComplete?: Function
  timeInterval: number
  onResendClick?: Function
}

const useResendOTP = ({
  maxTime,
  onTimerComplete,
  timeInterval,
  onResendClick,
}: useResendOTPProps) => {
  const timeout = useRef<any>()

  const [remainingTime, setRemainingTime] = useState(maxTime)

  useEffect(() => {
    if (timeout.current && remainingTime === 0) {
      clearTimeout(timeout.current)
      if (onTimerComplete) {
        onTimerComplete()
      }
    } else {
      timeout.current = setTimeout(() => {
        setRemainingTime((t) => t - 1)
      }, timeInterval)
    }
    return () => {
      clearTimeout(timeout.current)
    }
  }, [onTimerComplete, remainingTime, timeInterval])

  const handelResendClick = () => {
    if (onResendClick) {
      onResendClick(remainingTime === 0)
    }
    setRemainingTime(maxTime)
  }

  return {
    handelResendClick,
    remainingTime,
  }
}

export default useResendOTP
