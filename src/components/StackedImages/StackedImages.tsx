import { styled } from '@linaria/react'
import React from 'react'

import Image from '../Base/Image'

import { StackContainer } from './styledComponents'

interface StackedImageProps {
  urls: string[]
}
export default function StackedImages({ urls }: StackedImageProps) {
  return (
    <StackContainer>
      {urls.map((url, index) => (
        <Image
          alt="amc-logo"
          className="image"
          src={url}
          key={index}
          height={38}
          width={38}
        />
      ))}
    </StackContainer>
  )
}
