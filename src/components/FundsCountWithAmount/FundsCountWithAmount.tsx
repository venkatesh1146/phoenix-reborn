import { styled } from '@linaria/react'
import { WealthyAmount } from 'frontend-models'
import React from 'react'

interface FundsCountWithAmountProps {
  className?: string
}

export default function FundsCountWithAmount({
  className = '',
}: FundsCountWithAmountProps) {
  return (
    <Wrapper className={className}>
      <Text>Switch to wealthy investment for 4 Funds</Text>
      <SubSection>
        <TotalTxt>Total Amount</TotalTxt>
        <Amount>{WealthyAmount.init(700000).currencyFormat(2)}</Amount>
      </SubSection>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: #f9f9f9;
  font-family: 'Maven Pro';
  font-size: 1rem;
  border-radius: 8px;
`
const Text = styled.p`
  padding: 1.5rem 2.8rem;
  border-bottom: 0.2px solid #00000074;
  text-align: center;
`
const Amount = styled.p`
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  padding: 0.8rem;
  font-size: 1.5rem;
  font-weight: 500;
`
const SubSection = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
`
const TotalTxt = styled.p`
  text-align: center;
`
