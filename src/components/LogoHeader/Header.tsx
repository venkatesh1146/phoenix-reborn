import { styled } from '@linaria/react'
import React from 'react'

import Image from '../Base/Image'

import { WealthyImages } from '~/assets'

export default function LogoHeader() {
  return (
    <HeaderWrapper>
      <Image height={48} alt="logo" src={WealthyImages.wealthyLogoWhite} />
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  height: 7.2rem;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background-color: #1e1730;
`
