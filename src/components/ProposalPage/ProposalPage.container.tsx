import { styled } from '@linaria/react'
import React from 'react'

import FundsCountWithAmount from '../FundsCountWithAmount/FundsCountWithAmount'

export default function ProposalPage() {
  return (
    <Wrapper>
      <FundsCountWithAmount />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  padding: 1.5rem;
  background: #ffffff;
`
