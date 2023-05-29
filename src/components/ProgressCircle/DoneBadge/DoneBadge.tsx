import React from 'react'

import Image from '~/components/Base/Image'

import { DoneWrapper, Text } from '../styledComponents'

import { WealthyImages } from '~/assets'

export default function DoneBadge() {
  return (
    <DoneWrapper>
      <Image
        alt="tick"
        height={18}
        width={18}
        src={WealthyImages.tickWithBgDesign}
      />
      <Text
        style={{
          color: '#14B195',
          marginLeft: '0.5rem',
        }}
      >
        All Done
      </Text>
    </DoneWrapper>
  )
}
