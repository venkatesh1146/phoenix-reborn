import { styled } from '@linaria/react'
import React from 'react'

import Image from '../Base/Buttons/Image'

interface StackedImageProps {
  urls: string[]
}
export default function StackedImages({ urls }: StackedImageProps) {
  return (
    <StackContainer>
      {urls.map((url, index) => (
        <Image
          className="image"
          src={url}
          key={index}
          height={'2.3rem'}
          width={'2.3rem'}
        />
      ))}
    </StackContainer>
  )
}

const StackContainer = styled.div`
  display: flex;
  .image {
    border-radius: 50%;
    margin-left: -0.7rem;
  }
`
