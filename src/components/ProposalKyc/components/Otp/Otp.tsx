/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { styled } from '@linaria/react'
import React, { ChangeEvent } from 'react'

import { PrimaryButton } from '~/components/Base/Buttons'

interface OtpPropTypes {
  handlePaste: any
  isLoading: boolean
  isMobile?: boolean
  onEdit: (event: any) => void
  onKeyUpHandler: (event: any, p1: any, p2: any, p3: any) => void
  onOtpChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  onResend: (event: any) => void
  onSubmit: (event: any) => void
  otp: string
  state: Record<string, any>
}

const Otp = ({
  isLoading,
  isMobile,
  state,
  onEdit,
  onKeyUpHandler,
  onOtpChangeHandler,
  onResend,
  onSubmit,
  otp,
  handlePaste,
}: OtpPropTypes) => {
  const numberOfOtpDigits = [...Array(6).keys()]

  const otpContent = numberOfOtpDigits.map((index) => (
    <OtpInput
      autoFocus={index === 0 ? true : false}
      className="otp-input"
      data-index={index}
      id={index + ''}
      key={index}
      maxLength={1}
      placeholder="__"
      type="tel"
      onChange={onOtpChangeHandler}
      onKeyUp={(event) =>
        onKeyUpHandler(event.keyCode, index - 1, event.target, index + 1)
      }
      onPaste={handlePaste}
    />
  ))

  return (
    <OtpWrapper>
      <Title>Enter Otp</Title>
      <SubHeader>
        We have sent an OTP to your{' '}
        {isMobile
          ? `phone number ${state.countryCode} ${state.phoneNumber}`
          : `email ${state.email}`}
        <span
          style={{
            cursor: 'pointer',
            color: 'blue',
            marginLeft: '1rem',
            wordBreak: 'break-word',
          }}
          onClick={onEdit}
        >
          Edit
        </span>
      </SubHeader>
      <InputsContainer>
        <form onSubmit={onSubmit}>
          <OtpContainer>
            <OtpInputs>{otpContent}</OtpInputs>
          </OtpContainer>

          <p style={{ color: 'blue', cursor: 'pointer' }} onClick={onResend}>
            Resend
          </p>

          <PrimaryButton
            disabled={isLoading || otp.length !== 6}
            style={{ margin: '3em 0' }}
            onClick={onSubmit}
          >
            Proceed
          </PrimaryButton>
        </form>
      </InputsContainer>
    </OtpWrapper>
  )
}

const OtpWrapper = styled.div`
  height: 100vh;
  width: 40%;
  word-break: break-all;
  margin: 4em auto;
  position: relative;
  text-align: center;
  @media (max-width: 768px) {
    width: 95%;
  }
`

const OtpContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 0 30px; */
  margin-top: 2.4rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`

const Container = styled.div`
  padding: 2.4rem 0;
  width: 90%;
  margin: 0 auto;
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 400;
  color: #000000;
  font-family: DmSerif;
`

const SubHeader = styled.p`
  margin: 1rem 0 0 0;
  padding: 0;
  color: #7e7e7e;
  font-size: 1.4rem;
  font-weight: 400;
  font-family: MavenPro;
`

const OtpInputs = styled.div`
  display: flex;
  min-width: 250px;
  justify-content: space-around;
`

const OtpInput = styled.input`
  text-align: center;
  font-size: 1.6rem;
  border: none;
  width: 6rem;
  height: 6rem;
  border-radius: 12px;
  background-color: #fff;
  outline: unset;
  &::placeholder {
    color: #ddd;
    /* padding: 1rem; */
  }

  @media (max-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
`

const InputsContainer = styled.div`
  margin: 7rem 0 0 0;
`

export default Otp
