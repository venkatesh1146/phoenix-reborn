import { styled } from '@linaria/react'
import React from 'react'

import Image from '../Image'

import { WealthyImages } from '~/assets'

interface InfoPropsTypes {
  text: string
}
export default function Info({ text }: InfoPropsTypes) {
  return (
    <Wrapper>
      <Image style={{ marginTop: '2px' }} src={WealthyImages.infoIcon} />
      <Text>{text}</Text>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
`
const Text = styled.p`
  font-size: 0.8rem;
  font-family: 'Maven Pro';
  margin: 0;
  line-height: 20px;
  margin-left: 0.5rem;
`
