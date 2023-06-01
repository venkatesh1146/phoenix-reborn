import { WealthyAmount } from 'frontend-models'
import React from 'react'

import Image from '../Base/Image'

import {
  Amount,
  Heading,
  NameSection,
  NumbersContainer,
  SubSection,
  Text,
  TotalTxt,
  Wrapper,
} from './styledComponents'

import { WealthyImages } from '~/assets'

interface FundsCountWithAmountProps {
  className?: string
  amount: number
  totalFunds: number
}

export default function FundsCountWithAmount({
  className = '',
  amount,
  totalFunds,
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
          <Text>Reallocation Summary</Text>
        </Heading>
      </NameSection>
      <SubSection>
        <NumbersContainer>
          <TotalTxt>Total Reallocation Amount</TotalTxt>
          <Amount style={{ textAlign: 'left' }}>
            {amount ? WealthyAmount.init(amount).currencyFormat(2) : '--'}
          </Amount>
        </NumbersContainer>
        <NumbersContainer>
          <TotalTxt>Total Funds</TotalTxt>
          <Amount style={{ textAlign: 'right' }}>
            {totalFunds
              ? totalFunds < 10
                ? `0` + totalFunds
                : totalFunds
              : '--'}
          </Amount>
        </NumbersContainer>
      </SubSection>
    </Wrapper>
  )
}
