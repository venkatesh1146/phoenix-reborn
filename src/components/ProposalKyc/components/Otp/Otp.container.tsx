/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { compose, graphql } from 'react-apollo'
import { toast } from 'react-hot-toast'

import { handleApiError } from '~/utils/ErrorUtils'

import Otp from './Otp'

import {
  REQUEST_USER_PROFILE_UPDATE,
  VERIFY_USER_PROFILE_UPDATE,
} from '~/graphql'

interface OtpContainerPropTypes {
  dispatch: Function
  isMobile: boolean
  requestUserProfileUpdate: Function
  state: Record<string, any>
  user: Record<string, any>
  verifyUserProfileUpdate: Function
}

const defaultProps = {
  isMobile: false,
}

const OtpContainer = ({
  dispatch,
  isMobile,
  state,
  user,
  requestUserProfileUpdate,
  verifyUserProfileUpdate,
}: OtpContainerPropTypes) => {
  const [otp, setOtp] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
    const otpInputs = Array.from(document.querySelectorAll('.otp-input'))
    const clip = event.clipboardData.getData('text')
    const pin = clip.replace(/\s/g, '')
    const ch = [...pin]
    otpInputs.forEach((el, i) => (el.value = ch[i] ? ch[i] : ''))
    otpInputs[pin.length - 1].focus()
    setOtp(ch)
  }

  const onSubmit = (event: any) => {
    event?.preventDefault()
    setIsLoading(true)
    verifyUserProfileUpdate({ token: state.token, otp: otp.join('') })
      .then(({ data }: any) => {
        toast.success(data.verifyUserProfileUpdate.message)
        if (isMobile) {
          dispatch({ type: 'update', name: 'stage', value: 2 })
          return
        }
        dispatch({ type: 'update', name: 'stage', value: 3 })
      })
      .catch(handleApiError)
      .finally(() => setIsLoading(false))
  }

  const onResend = () => {
    requestUserProfileUpdate(
      isMobile
        ? { phoneNumber: `(${state.countryCode})${state.phoneNumber}` }
        : { email: state.email }
    ).catch(handleApiError)
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
      // setOtp={setOtp}
      state={state}
      onEdit={onEdit}
      onKeyUpHandler={onKeyUpHandler}
      onOtpChangeHandler={onOtpChangeHandler}
      onResend={onResend}
      onSubmit={onSubmit}
    />
  )
}

const withVerify = graphql(VERIFY_USER_PROFILE_UPDATE, {
  props: ({ mutate }) => ({
    verifyUserProfileUpdate: (payload: any) =>
      mutate
        ? mutate({
            variables: {
              input: payload,
            },
          })
        : {},
  }),
})

const withResend = graphql(REQUEST_USER_PROFILE_UPDATE, {
  props: ({ mutate }) => ({
    requestUserProfileUpdate: (payload: any) =>
      mutate
        ? mutate({
            variables: {
              input: payload,
            },
          })
        : {},
  }),
})

const withMutation = compose(withVerify, withResend)

OtpContainer.defaultProps = defaultProps

export default withMutation(OtpContainer)
