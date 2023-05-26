import { WealthyAmount } from 'frontend-models'
import React from 'react'

import StackedImages from '../StackedImages'

import {
  Amount,
  AmountAndLogos,
  FundsCount,
  Header,
  Heading,
  Wrapper,
} from './styledComponents'

interface FundsSwitchOverviewProps {
  totalAmount?: number
  numberOfFunds: string | number
  fundsIcons: string[]
  wrapperClassName?: string
}
export default function FundsSwitchOverview({
  totalAmount,
  numberOfFunds,
  fundsIcons,
  wrapperClassName = '',
}: FundsSwitchOverviewProps) {
  return (
    <Wrapper className={wrapperClassName}>
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
