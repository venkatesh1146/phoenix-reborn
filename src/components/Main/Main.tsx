import Dialog from 'rc-dialog'
import { useState } from 'react'

import Image from '../Base/Image'

import { Container } from './Main.styles'
export function Main() {
  return (
    <Container>
      <a href="https://www.wealthy.in/">
        <Image
          src={
            'https://i.wlycdn.com/wealthy-home-page/partners-footer-wealthy-logo.svg'
          }
          height={100}
          width={300}
          alt="logo"
        />
      </a>
    </Container>
  )
}
