import { styled } from '@linaria/react'
import React from 'react'

import Image from '~/components/Image'

import { WealthyImages } from '~/assets'

interface EmailPropTypes {
  email: string
  isVerified: boolean
  onVerify?: (email: string) => void
}

export default function Email({ email, isVerified, onVerify }: EmailPropTypes) {
  if (isVerified)
    return (
      <Wrapper>
        <EmailTxt>{email}</EmailTxt>
        <Image width={'0.9rem'} src={WealthyImages.greenTickIcon} />
        <VerifiedTxt>Verified</VerifiedTxt>
      </Wrapper>
    )
  return <Wrapper>Email</Wrapper>
}

const Wrapper = styled.div`
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0.75rem 0.85rem;
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
