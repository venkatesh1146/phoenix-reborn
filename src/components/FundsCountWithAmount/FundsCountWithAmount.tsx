import { WealthyAmount } from 'frontend-models'
import React from 'react'

import Image from '../Base/Image'

import {
  Amount,
  Heading,
  NameSection,
  SubSection,
  SubText,
  Text,
  TotalTxt,
  Wrapper,
} from './styledComponents'

import { WealthyImages } from '~/assets'

interface FundsCountWithAmountProps {
  className?: string
  amount: number
}

export default function FundsCountWithAmount({
  className = '',
  amount,
}: FundsCountWithAmountProps) {
  return (
    <Wrapper className={className}>
      <NameSection>
        <Image
          alt="rupee"
          src={WealthyImages.rupeeSymbolCrystal}
          height={32}
          width={32}
        />
        <Heading>
          <Text>Switch Funds from Tracker</Text>
          <SubText>Move your investments to Wealthy</SubText>
        </Heading>
      </NameSection>
      <SubSection>
        <TotalTxt>Total Amount</TotalTxt>
        <Amount>
          {amount ? WealthyAmount.init(amount).currencyFormat(2) : '--'}
        </Amount>
      </SubSection>
    </Wrapper>
  )
}
