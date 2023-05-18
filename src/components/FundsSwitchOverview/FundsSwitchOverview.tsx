import { styled } from '@linaria/react'
import { WealthyAmount } from 'frontend-models'
import React from 'react'

import StackedImages from '../StackedImages'

interface FundsSwitchOverviewProps {
  totalAmount?: number
  numberOfFunds: string | number
  fundsIcons: string[]
}
export default function FundsSwitchOverview({
  totalAmount,
  numberOfFunds,
  fundsIcons,
}: FundsSwitchOverviewProps) {
  return (
    <Wrapper>
      <Header>
        <Heading>Switch Funds from Tracker</Heading>
        <FundsCount>{numberOfFunds}&nbsp;Funds</FundsCount>
      </Header>
      <AmountAndLogos>
        <StackedImages urls={fundsIcons} />
        <Amount>{WealthyAmount.init(totalAmount).currencyFormat(2)}</Amount>
      </AmountAndLogos>
    </Wrapper>
  )
}

const AmountAndLogos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
`
const Wrapper = styled.div`
  padding: 1.25rem 1.25rem 2rem 1.25rem;
  background: #3b2c62;
  border-radius: 8px;
`
const FundsCount = styled.p`
  font-family: 'Maven Pro';
  font-size: 0.8rem;
  text-transform: capitalize;
  color: #e6e6e6;
  display: flex;
  align-items: center;
`
const Heading = styled.p`
  font-family: 'Maven Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 19px;
  color: #ffffff;
  align-items: center;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const Amount = styled.p`
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  mix-blend-mode: normal;
`
