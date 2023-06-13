/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import React, { useState } from 'react'
// import { compose, graphql } from 'react-apollo'
import { toast } from 'react-hot-toast'

import { handleApiError } from '~/utils/ErrorUtils'

import Otp from './Otp'

import {
  REQUEST_USER_PROFILE_UPDATE,
  VERIFY_USER_PROFILE_UPDATE,
} from '~/graphql'
import useGqlMutation from '~/hooks/useGqlMutation'

interface OtpContainerPropTypes {
  dispatch: Function
  isMobile?: boolean
  state: Record<string, any>
  user: Record<string, any>
}

const OtpContainer = ({
  dispatch,
  isMobile = false,
  state,
  user,
}: OtpContainerPropTypes) => {
  const [otp, setOtp] = useState<any[]>([])

  const { mutate: verifyUserProfileUpdate, isLoading } = useGqlMutation({
    mutation: VERIFY_USER_PROFILE_UPDATE,
  })
  const { mutate: requestUserProfileUpdate } = useGqlMutation({
    mutation: REQUEST_USER_PROFILE_UPDATE,
  })

  const onKeyUpHandler = (
    keyCode: number,
    previousElement: string | number,
    currentElement: { value: string | any[] },
    nextElement: string
  ) => {
    if ((keyCode === 8 || keyCode === 46) && previousElement !== -1) {
      document?.getElementById(previousElement)?.focus()
    }

    if (currentElement.value.length) {
      document?.getElementById(nextElement)?.focus()
    }
  }

  const onOtpChangeHandler = (event: any) => {
    const otpInputs: any = Array.from(document.querySelectorAll('.otp-input'))
    const {
      value,
      dataset: { index },
    } = event.target

    const newOtp: any[] = otp.slice()
    newOtp[index] = value
    setOtp(newOtp)

    const nextIndex = +index + 1
    if (value && otpInputs[nextIndex]) {
      otpInputs[nextIndex]?.select()
    } else if (value && !otpInputs[nextIndex]) {
      // event.target.blur();
    }
  }

  const handlePaste = (event: any) => {
    const otpInputs: any = Array.from(document.querySelectorAll('.otp-input'))
    const clip = event.clipboardData.getData('text')
    const pin = clip.replace(/\s/g, '')
    const ch = [...pin]
    otpInputs.forEach((el, i) => (el.value = ch[i] ? ch[i] : ''))
    otpInputs[pin.length - 1]?.focus()
    setOtp(ch)
  }

  const onSubmit = (event: any) => {
    toast.loading('loading', { id: 'submit-otp' })
    event?.preventDefault()
    verifyUserProfileUpdate({
      variables: { input: { token: state.token, otp: otp.join('') } },
      onSuccess: ({ data }: any) => {
        toast.success(data.verifyUserProfileUpdate.message, {
          id: 'submit-otp',
        })
        if (isMobile) {
          dispatch({ type: 'update', name: 'stage', value: 2 })
          return
        }
        dispatch({ type: 'update', name: 'stage', value: 3 })
      },
      onFailure: (e) => handleApiError(e, 'submit-otp'),
    })
  }

  const onResend = () => {
    toast.loading('loading', { id: 'resend-otp' })
    requestUserProfileUpdate({
      variables: {
        input: isMobile
          ? { phoneNumber: `(${state.countryCode})${state.phoneNumber}` }
          : { email: state.email },
      },
      onFailure: handleApiError,
      onSuccess: () =>
        toast.success('OTP sent successfully', { id: 'resend-otp' }),
    })
  }

  const onEdit = () => {
    isMobile
      ? dispatch({ type: 'update', name: 'stage', value: 1 })
      : dispatch({ type: 'update', name: 'stage', value: 2 })
  }

  return (
    <Otp
      handlePaste={handlePaste}
      isLoading={isLoading}
      isMobile={isMobile}
      otp={otp.join('')}
      state={state}
      onEdit={onEdit}
      onKeyUpHandler={onKeyUpHandler}
      onOtpChangeHandler={onOtpChangeHandler}
      onResend={onResend}
      onSubmit={onSubmit}
    />
  )
}

export default OtpContainer
