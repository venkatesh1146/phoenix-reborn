import React from 'react'

import Image from '../Base/Image'

import { Text, Wrapper } from './styledComponents'

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
