import { styled } from '@linaria/react'
import { WealthyAmount } from 'frontend-models'
import React from 'react'

import Image from '../Image'

import { WealthyImages } from '~/assets'
import { FundMetaDataType } from '~/constants/interfaces'

interface FundSwitchCardProps {
  WrapperClassName?: string
  data: {
    from: FundMetaDataType
    to: FundMetaDataType
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
        <Amount>{WealthyAmount.init(from.amount).currencyFormat(2)}</Amount>
      </FundDetails>
      <ImageContainer>
        <Image
          className="arrow-icon"
          src={WealthyImages.arrowWithRoundBgIcon}
          height={'2rem'}
          width={'2rem'}
        />
      </ImageContainer>
      <FundDetails>
        <Image className="circular-image" src={from.logoUrl} height={'4rem'} />
        <Name>{from.fundName}</Name>
        <Units>{`${from.units} units`}</Units>
        <Amount>{WealthyAmount.init(to.amount).currencyFormat(2)}</Amount>
      </FundDetails>
    </Wrapper>
  )
}

const ImageContainer = styled.div`
  width: 0.2rem;
  margin: 0 2rem 0 1.5rem;
  background: #f6f2ff;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
    margin: 0 1.25rem;
    align-self: center;
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
