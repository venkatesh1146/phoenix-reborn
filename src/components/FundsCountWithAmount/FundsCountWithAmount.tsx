import { styled } from '@linaria/react'
import React from 'react'

export default function FundsCountWithAmount() {
  return (
    <Wrapper>
      <Text>Switch to wealthy investment for 4 Funds</Text>
      <SubSection>
        <TotalTxt>Total Amount</TotalTxt>
        <Amount>Rs 7,00,000</Amount>
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
  border-bottom: 0.2px solid #000000;
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
