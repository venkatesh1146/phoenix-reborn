import { styled } from '@linaria/react'
import React from 'react'

import FundSwitchCard from '../FundSwitchCard'

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
const FundsCount = styled.p`
  color: #7e7e7e;
  font-size: 0.8rem;
  font-family: 'Maven Pro';
`
const Wrapper = styled.div`
  background: #f6f2ff;
  padding: 1.2rem 1.2rem 3.8rem 1.2rem;
  @media (min-width: 1100px) {
    border-radius: 16px;
  }
`
const Heading = styled.div`
  font-family: 'Marcellus';
  font-size: 1.25rem;
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const FundSwitches = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
  .fund-switch-wrapper {
    margin: 0.5rem;
  }
`
