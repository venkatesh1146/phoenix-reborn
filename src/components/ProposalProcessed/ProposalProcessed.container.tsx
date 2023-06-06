import { styled } from '@linaria/react'
import React from 'react'

import { tm } from '~/styles/theme'

import Image from '../Base/Image'
import FundsSwitchOverview from '../FundsSwitchOverview'
import PortfolioAllocation from '../PortfolioAllocation'
import UserNameHeader from '../UserNameHeader'
import FullScreenSpinner from '../common/Spinner/FullScreenSpinner'

import { HeaderSection, Text, Wrapper } from './styledComponents'

import { WealthyImages } from '~/assets'
import useMFSwitchProposal from '~/hooks/useMFSwitchProposal'

export default function ProposalProcessed() {
  const { proposalData, isLoading, getAMCLogos } = useMFSwitchProposal()

  return isLoading ? (
    <FullScreenSpinner />
  ) : (
    <Wrapper>
      <HeaderSection>
        <UserNameHeader userName={proposalData?.clientName} />
        <Image
          alt="tick-icon"
          className="tick-icon"
          src={WealthyImages.diamondTick}
          width={148}
          height={140}
        />
        <Text>The investment proposal has been successfully processed!</Text>
        <FundsSwitchOverview
          wrapperClassName="funds-switch-wrapper"
          totalAmount={proposalData?.totalAmount}
          numberOfFunds={proposalData?.schemes.length ?? ''}
          fundsIcons={getAMCLogos() ?? []}
        />
      </HeaderSection>
      <PortfolioAllocation switchFunds={proposalData?.schemes ?? []} />
    </Wrapper>
  )
}
