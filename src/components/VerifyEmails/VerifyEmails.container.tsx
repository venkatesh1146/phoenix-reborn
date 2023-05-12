import { styled } from '@linaria/react'
import React from 'react'

import Header from '../Header'
import Image from '../Image'

import { WealthyImages } from '~/assets'

export default function VerifyEmailsContainer() {
  return (
    <Wrapper>
      <Header />
      <Body>
        <div>
          <Image height={'10rem'} src={WealthyImages.emailIcon} />
        </div>
        <h3>Email Ids Verification</h3>
        <p>{`We found the following Email ID's mapped to these funds`}</p>
      </Body>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #ffffff;
  height: 100vh;
  width: 100vw;
  font-family: 'Maven Pro';
`

const Body = styled.div`
  flex-grow: 1;
  padding: 8rem;
`
