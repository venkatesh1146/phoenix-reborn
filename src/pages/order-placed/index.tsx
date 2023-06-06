import React from 'react'

import Image from '../../components/Base/Image'
import FundsSwitchOverview from '../../components/FundsSwitchOverview'
import Info from '../../components/Info/Info'
import {
  Divider,
  FundsWrapper,
  ImageContainer,
  SubText,
  Text,
  Wrapper,
} from '../../components/OrderPlaced/styledComponents'
import FullScreenSpinner from '../../components/common/Spinner/FullScreenSpinner'

import { WealthyImages } from '~/assets'
import { useIsDesktop } from '~/hooks/useIsDesktop'
import useMFSwitchProposal from '~/hooks/useMFSwitchProposal'

export default function ProposalAccepted() {
  const { proposalData, isLoading, getAMCLogos } = useMFSwitchProposal()
  const isDesktop = useIsDesktop()
  const imageSize = isDesktop ? 236 : 148
  if (isLoading) return <FullScreenSpinner />
  return (
    <Wrapper>
      {isDesktop ? (
        <Image
          src={WealthyImages.wealthyLogoDarkPurple}
          alt="wealthy"
          width={127}
          height={37}
          style={{ marginTop: '1rem', marginRight: '-6rem' }}
        />
      ) : null}
      <ImageContainer>
        <Image
          alt="diamond"
          className="diamond-tick"
          src={WealthyImages.diamondTick}
          height={imageSize}
          width={imageSize}
        />
        <Text>Congratulations!</Text>
        <SubText>You have successfully accepted the Proposal</SubText>
      </ImageContainer>
      {!isDesktop ? <Divider /> : null}
      <FundsWrapper>
        <FundsSwitchOverview
          totalAmount={proposalData?.totalAmount}
          numberOfFunds={proposalData?.schemes?.length || ''}
          fundsIcons={getAMCLogos() ?? []}
        />
        <Info
          text={'It usually takes 3-4 Days for all the funds to reallocate'}
          wrapperClassName="info-text"
        />
      </FundsWrapper>
    </Wrapper>
  )
}
