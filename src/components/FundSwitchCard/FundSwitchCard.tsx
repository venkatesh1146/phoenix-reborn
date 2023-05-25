import { styled } from '@linaria/react'
import { WealthyAmount } from 'frontend-models'
import React from 'react'

import { tm, withTheme } from '~/styles/theme'

import Image from '../Base/Image'

import { WealthyImages } from '~/assets'
import { FundMetaDataType } from '~/constants/interfaces'

interface FundSwitchCardProps {
  WrapperClassName?: string
  data: {
    switchout: FundMetaDataType
    switchin: FundMetaDataType
    amcIconUrl: string
  }
  theme: any
}

function FundSwitchCard({
  data: { switchout, switchin, amcIconUrl },
  WrapperClassName = '',
}: FundSwitchCardProps) {
  return (
    <>
      <Wrapper className={WrapperClassName}>
        <FundDetails>
          <Image
            alt={switchout.fundName}
            className="circular-image"
            src={amcIconUrl}
            height={64}
            width={64}
          />
          <Name>{switchout.fundName}</Name>
          <Units>{`${switchout.units} units`}</Units>
          <Amount>
            {WealthyAmount.init(switchout.amount).currencyFormat(2)}
          </Amount>
        </FundDetails>
        <ImageContainer>
          <Image
            alt="arrow"
            style={{ borderRadius: '50%' }}
            className="arrow-icon"
            src={WealthyImages.arrowWithRoundBgIcon}
            height={32}
            width={32}
          />
        </ImageContainer>
        <FundDetails>
          <Image
            alt={switchin.fundName}
            className="circular-image"
            src={amcIconUrl}
            height={64}
            width={64}
          />
          <Name>{switchin.fundName}</Name>
          <Units>{`${switchin.units} units`}</Units>
          <Amount>
            {WealthyAmount.init(switchin.amount).currencyFormat(2)}
          </Amount>
        </FundDetails>
      </Wrapper>
    </>
  )
}

export default withTheme(FundSwitchCard)

const ImageContainer = styled.div`
  width: 0.2rem;
  margin: 0 2rem 0 1.5rem;
  background: ${tm((t) => t.colors.lightBgColor)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const Wrapper = styled.div`
  display: flex;
  background-color: ${tm((t) => t.colors.white)};
  border-radius: 4px;
  padding: 1rem;
  font-family: 'Maven Pro';
  justify-content: space-around;
  .circular-image {
    border-radius: 50% !important;
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
  color: ${tm((t) => t.colors.secondaryTextColor)};
`
const Amount = styled.p`
  font-size: 0.875rem;
`
