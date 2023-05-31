import { WealthyAmount } from 'frontend-models'
import React from 'react'

import { withTheme } from '~/styles/theme'

import Image from '../Base/Image'

import {
  Amount,
  FundDetails,
  ImageContainer,
  Name,
  Numbers,
  Units,
  Wrapper,
} from './styledComponents'

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
          <Numbers>
            <Name>{switchout.fundName}</Name>
            <Units>{`${switchout.units} units`}</Units>
            <Amount>
              {WealthyAmount.init(switchout.amount).currencyFormat(2)}
            </Amount>
          </Numbers>
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
          <Numbers>
            <Name>{switchin.fundName}</Name>
            <Units>{`${switchin.units} units`}</Units>
            <Amount>
              {WealthyAmount.init(switchin.amount).currencyFormat(2)}
            </Amount>
          </Numbers>
        </FundDetails>
      </Wrapper>
    </>
  )
}

export default withTheme(FundSwitchCard)
