/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { styled } from '@linaria/react'
import React, { ChangeEvent } from 'react'

import { PrimaryButton } from '~/components/Base/Buttons'
import Spinner from '~/components/common/Spinner'

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
      type="number"
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
            marginLeft: '1rem',
            wordBreak: 'break-word',
            color: '#000',
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

          <ResendTxt>
            Not received OTP yet? &nbsp;
            <ResendBtn onClick={onResend}>Resend OTP</ResendBtn>
          </ResendTxt>
          <PrimaryButton
            disabled={isLoading || otp.length !== 6}
            style={{ margin: 'auto 0 0 0' }}
            onClick={onSubmit}
          >
            {isLoading ? <Spinner /> : 'Proceed'}
          </PrimaryButton>
        </form>
      </InputsContainer>
    </OtpWrapper>
  )
}

const ResendBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 450;
`

const ResendTxt = styled.div`
font-size: 0.9rem
text-align: center
display: flex
align-items: center
margin-top:0.5rem;
justify-content: center;
`

const OtpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .otp-input {
    min-width: 1rem;
    width: 1rem;
    flex: 1;
    margin: 0 8px;
    height: 3rem;
    border-bottom: 1px solid #000000;
    border-radius: 0;
    background: transparent;
    font-size: 1rem;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  }
`

const OtpContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 4rem;
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 1.25rem;
  font-weight: 400;
  color: #000000;
  font-family: 'DM Serif Display';
`

const SubHeader = styled.p`
  margin: 1rem 0 0 0;
  padding: 0;
  color: #7e7e7e;
  font-size: 0.9rem;
  font-weight: 400;
  font-family: 'Maven Pro';
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
  margin: 4rem 0 0 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

export default Otp
