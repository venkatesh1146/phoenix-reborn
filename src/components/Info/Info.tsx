import { styled } from '@linaria/react'
import React from 'react'

import { tm } from '~/styles/theme'

import Image from '../Base/Image'

import { WealthyImages } from '~/assets'

interface InfoPropsTypes {
  text: string
  wrapperClassName?: string
}
export default function Info({ text, wrapperClassName = '' }: InfoPropsTypes) {
  return (
    <Wrapper className={wrapperClassName}>
      <Image
        alt="info"
        width={14}
        height={14}
        style={{ marginTop: '2px' }}
        src={WealthyImages.infoIcon}
      />
      <Text>{text}</Text>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: ${tm((t) => t.colors.primaryBgColor)};
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  border: 1px solid #a69ebc;
`
const Text = styled.p`
  font-size: 0.8rem;
  font-family: 'Maven Pro';
  margin: 0;
  line-height: 20px;
  margin-left: 0.5rem;
  color: #a69ebc;
`
