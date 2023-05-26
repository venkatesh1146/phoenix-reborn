import React from 'react'

import Image from '../Base/Image'

import { HeaderWrapper } from './styledComponents'

import { WealthyImages } from '~/assets'

export default function LogoHeader() {
  return (
    <HeaderWrapper>
      <Image
        height={48}
        width={48}
        alt="logo"
        src={WealthyImages.wealthyLogoWhite}
      />
    </HeaderWrapper>
  )
}
