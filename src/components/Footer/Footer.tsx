import React from 'react'

import { PrimaryButton } from '../Base/Buttons'
import Image from '../Base/Image'
import Spinner from '../Spinner'

import { CallIconContainer, Wrapper } from './styledComponents'

import { WealthyImages } from '~/assets'

interface FooterProps {
  agentPhoneNumber?: number | string
  btnTxt?: string
  onClick?: () => void
  isDisabled?: boolean
  isLoading?: boolean
}
export default function Footer({
  agentPhoneNumber,
  btnTxt = 'Verify and Proceed',
  onClick,
  isDisabled = false,
  isLoading = false,
}: FooterProps) {
  return (
    <Wrapper className="footer-wrapper mf-switch-footer-wrapper">
      {agentPhoneNumber ? (
        <CallIconContainer
          className="call-icon-container"
          href={`tel:${agentPhoneNumber}`}
        >
          <Image
            alt={'call-icon'}
            src={WealthyImages.callIcon}
            height={20}
            width={20}
          />
        </CallIconContainer>
      ) : (
        <></>
      )}
      <PrimaryButton
        disabled={isDisabled}
        className="cta-button"
        onClick={onClick}
        style={{ background: isLoading ? '#fff' : '' }}
      >
        {isLoading ? <Spinner /> : btnTxt}
      </PrimaryButton>
    </Wrapper>
  )
}
