import { styled } from '@linaria/react'
import React from 'react'

import Image from '../Image'

import { WealthyImages } from '~/assets'

interface FundMetaData {
  fundName: string
  logoUrl: string
  amount: number
  units: number
}

interface FundSwitchCardProps {
  WrapperClassName?: string
  data: {
    from: FundMetaData
    to: FundMetaData
  }
}

export default function FundSwitchCard({
  data: { from, to },
  WrapperClassName = '',
}: FundSwitchCardProps) {
  return (
    <Wrapper className={WrapperClassName}>
      <FundDetails>
        <Image className="circular-image" src={from.logoUrl} height={'4rem'} />
        <Name>{from.fundName}</Name>
        <Units>{`${from.units} units`}</Units>
        <Amount>{'Rs ' + from.amount}</Amount>
      </FundDetails>
      <Image className="arrow-icon" src={WealthyImages.blackArrowRight} />
      <FundDetails>
        <Image className="circular-image" src={from.logoUrl} height={'4rem'} />
        <Name>{from.fundName}</Name>
        <Units>{`${from.units} units`}</Units>
        <Amount>{'Rs ' + from.amount}</Amount>
      </FundDetails>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 1rem;
  font-family: 'Maven Pro';
  justify-content: space-around;
  .circular-image {
    border-radius: 50%;
  }
  .arrow-icon {
    margin-top: 1.5rem;
    margin: 1.5rem 1rem;
  }
`

const FundDetails = styled.div``
const Name = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
`
const Units = styled.p`
  font-size: 0.75rem;
  color: '#7E7E7E';
`
const Amount = styled.p`
  font-size: 0.875rem;
`
