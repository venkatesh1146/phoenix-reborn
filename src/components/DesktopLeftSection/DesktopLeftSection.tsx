import React from 'react'

import { useTheme, withTheme } from '~/styles/theme'

import Image from '../Base/Image'
import Info from '../Info'

import { ChildrenContainer, FooterWrapper, Wrapper } from './styledComponents'

import { WealthyImages } from '~/assets'

interface DesktopLeftSectionPropsType {
  children: JSX.Element
  footerTxt?: string
  childrenContainerStyles?: React.CSSProperties
  theme: any
}

function DesktopLeftSection({
  children,
  childrenContainerStyles = {},
  footerTxt = 'New investments will come under Wealthy ARN Capital Gain Taxes will be applicable',
}: DesktopLeftSectionPropsType) {
  return (
    <Wrapper className="mf-desktop-left-section-wrapper">
      <Image
        alt="logo"
        height={37}
        width={128}
        src={WealthyImages.wealthyLogoLightPurple}
      />
      <ChildrenContainer style={childrenContainerStyles}>
        {children}
      </ChildrenContainer>
      <FooterWrapper>
        <Info text={footerTxt} />
      </FooterWrapper>
    </Wrapper>
  )
}

export default withTheme(DesktopLeftSection)
