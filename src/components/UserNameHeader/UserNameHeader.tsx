import { styled } from '@linaria/react'
import React from 'react'

import { tm } from '~/styles/theme'

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

const Wrapper = styled.div`
  font-family: 'Marcellus' !important;
  font-size: 1.625rem;
  color: ${tm((t) => t.colors.white)};
`
