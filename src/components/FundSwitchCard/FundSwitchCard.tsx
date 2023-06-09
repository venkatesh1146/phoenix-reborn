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

const statusColorAndIconMap = {
  success: {
    color: 'rgba(20, 177, 149, 0.3)',
    icon: WealthyImages.greenTickFilled,
    text: 'Success',
  },
  failed: {
    color: 'rgba(255, 114, 98, 0.3)',
    icon: WealthyImages.failedIcon,
    text: 'Failed',
  },
  inprogress: {
    color: 'rgba(255, 170, 92, 0.3)',
    icon: WealthyImages.exclamationMark,
    text: 'In Progress',
  },
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
          <Status color={statusColorAndIconMap[status]?.color}>
            <Image
              src={statusColorAndIconMap[status]?.icon}
              height={10}
              width={10}
              alt={status}
              style={{ marginRight: '4px' }}
            />
            {statusColorAndIconMap[status]?.text}
          </Status>
        ) : null}
        <FundDetails>
          <Image
            alt={switchout.fundName}
            className="circular-image"
            src={amcIconUrl}
            height={48}
            width={48}
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
            height={48}
            width={48}
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
