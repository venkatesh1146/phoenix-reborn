import { WealthyAmount } from 'frontend-models'
import React from 'react'

import { withTheme } from '~/styles/theme'

import { TotalTxt } from '../FundsCountWithAmount/styledComponents'
import StackedImages from '../StackedImages'

import {
  Amount,
  AmountAndLogos,
  FundsCount,
  Header,
  Heading,
  Wrapper,
} from './styledComponents'

import { useIsDesktop } from '~/hooks/useIsDesktop'

interface FundsSwitchOverviewProps {
  totalAmount?: number
  numberOfFunds: string | number
  fundsIcons: string[]
  wrapperClassName?: string
  theme: any
}
function FundsSwitchOverview({
  totalAmount,
  numberOfFunds,
  fundsIcons,
  wrapperClassName = '',
}: FundsSwitchOverviewProps) {
  const isDesktop = useIsDesktop()
  if (isDesktop)
    return (
      <Wrapper className={wrapperClassName}>
        <Header>
          <Heading>Reallocation of Funds</Heading>
          <StackedImages urls={fundsIcons} />
        </Header>
        <AmountAndLogos>
          <div>
            <TotalTxt>Total Reallocation Amount</TotalTxt>
            <Amount style={{ textAlign: 'left' }}>
              {WealthyAmount.init(totalAmount).currencyFormat(2)}
            </Amount>
          </div>
          <div>
            <TotalTxt>Total Funds</TotalTxt>
            <FundsCount>
              {numberOfFunds < 10 ? '0' + numberOfFunds : numberOfFunds}
            </FundsCount>
          </div>
        </AmountAndLogos>
      </Wrapper>
    )
  return (
    <Wrapper className={wrapperClassName}>
      <Header>
        <Heading>Reallocation of Funds</Heading>
        <FundsCount>{numberOfFunds}&nbsp;Funds</FundsCount>
      </Header>
      <AmountAndLogos>
        <StackedImages urls={fundsIcons} />
        <Amount>{WealthyAmount.init(totalAmount).currencyFormat(2)}</Amount>
      </AmountAndLogos>
    </Wrapper>
  )
}
export default withTheme(FundsSwitchOverview)
