import { styled } from '@linaria/react'
import { WealthyAmount } from 'frontend-models'
import React from 'react'

import Image from '../Base/Image'

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

const Heading = styled.div`
  margin-left: 1.25rem;
`
const SubText = styled.p`
  color: #a69ebc;
  font-size: 0.8rem;
  opacity: 0.6;
  margin: 0;
`
const NameSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 0.2px solid #00000074;
  padding: 1.5rem;
`
const Wrapper = styled.div`
  background: #3b2c62;
  color: #fff;
  border-radius: 0.5rem;
  font-family: 'Maven Pro';
  font-size: 1rem;
`
const Text = styled.p`
  color: #e6e6e6;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`
const Amount = styled.p`
  border-radius: 0.25rem;
  text-align: center;
  padding: 0.8rem;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  color: #ffffff;
  mix-blend-mode: normal;
`
const SubSection = styled.div`
  padding: 1.5rem;
  color: #e6e6e6;
`
const TotalTxt = styled.p`
  text-align: center;
  margin: 0;
`
