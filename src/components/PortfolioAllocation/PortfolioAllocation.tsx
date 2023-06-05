import React from 'react'

import FundSwitchCard from '../FundSwitchCard'

import { FundSwitches, FundsCount, Heading, Wrapper } from './styledComponents'

import { FundMetaDataType } from '~/constants/interfaces'

interface SwitchFundType {
  switchout: FundMetaDataType
  switchin: FundMetaDataType
  amcIconUrl: string
  status?: string
}

interface PortfolioAllocationPropsType {
  switchFunds: SwitchFundType[]
  wrapperClassName?: string
  showEachFundStatus?: boolean
}

export default function PortfolioAllocation({
  switchFunds,
  wrapperClassName = '',
  showEachFundStatus,
}: PortfolioAllocationPropsType) {
  return (
    <Wrapper className={wrapperClassName}>
      <Heading>Reallocation Details</Heading>
      <FundSwitches className="portfolio-funds-wrapper">
        {switchFunds.map((sf, index) => (
          <FundSwitchCard
            key={index}
            WrapperClassName={'fund-switch-wrapper'}
            data={sf}
            showStatus={showEachFundStatus}
          />
        ))}
      </FundSwitches>
    </Wrapper>
  )
}
