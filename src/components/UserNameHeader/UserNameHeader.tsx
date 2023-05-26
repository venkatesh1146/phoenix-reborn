import { styled } from '@linaria/react'
import React from 'react'

import { tm } from '~/styles/theme'

import { Wrapper } from './styledComponents'

interface UserNameHeaderProps {
  userName?: string
}

export default function UserNameHeader({ userName = '' }: UserNameHeaderProps) {
  return (
    <Wrapper>
      <p>{`Hi ${userName},`}</p>
    </Wrapper>
  )
}
