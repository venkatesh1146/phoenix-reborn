import React from 'react'

import FundSwitchCard from '../FundSwitchCard'

import { FundSwitches, FundsCount, Heading, Wrapper } from './styledComponents'

import { FundMetaDataType } from '~/constants/interfaces'

interface SwitchFundType {
  switchout: FundMetaDataType
  switchin: FundMetaDataType
  amcIconUrl: string
}

interface PortfolioAllocationPropsType {
  switchFunds: SwitchFundType[]
}

export default function PortfolioAllocation({
  switchFunds,
}: PortfolioAllocationPropsType) {
  return (
    <Wrapper>
      <Heading>
        Portfolio Allocation
        <FundsCount>{switchFunds.length} Funds</FundsCount>
      </Heading>
      <FundSwitches>
        {switchFunds.map((sf, index) => (
          <FundSwitchCard
            key={index}
            WrapperClassName={'fund-switch-wrapper'}
            data={sf}
          />
        ))}
      </FundSwitches>
    </Wrapper>
  )
}
