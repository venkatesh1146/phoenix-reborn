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
  Status,
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
    status?: string
  }
  theme: any
  showStatus?: boolean
}

const getColorBasedOnStatus = (status: string) => {
  switch (status) {
    case 'success':
      return '#7AFF82'
    case 'failed':
      return '#FF7A8E'
    case 'inprogress':
    default:
      return '#ffe47a'
  }
}

function FundSwitchCard({
  data: { switchout, switchin, amcIconUrl, status },
  WrapperClassName = '',
  showStatus,
}: FundSwitchCardProps) {
  return (
    <>
      <Wrapper className={WrapperClassName}>
        {showStatus && !!status ? (
          <Status color={getColorBasedOnStatus(status)}>{status}</Status>
        ) : null}
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
