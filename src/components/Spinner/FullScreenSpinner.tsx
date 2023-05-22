import { styled } from '@linaria/react'
import React from 'react'

import Spinner from '.'

export default function FullScreenSpinner() {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
