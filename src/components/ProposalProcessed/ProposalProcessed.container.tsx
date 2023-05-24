import { styled } from '@linaria/react'
import React from 'react'

import Image from '../Base/Buttons/Image'
import FundsSwitchOverview from '../FundsSwitchOverview'
import PortfolioAllocation from '../PortfolioAllocation'
import FullScreenSpinner from '../Spinner/FullScreenSpinner'
import UserNameHeader from '../UserNameHeader'

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
          className="tick-icon"
          src={WealthyImages.diamondTick}
          width={'9.25rem'}
          height={'8.688rem'}
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

const HeaderSection = styled.div`
  background: #1e1730;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  .tick-icon {
    align-self: center;
  }
  .funds-switch-wrapper {
    margin-bottom: 1.5rem;
  }
`
const Text = styled.p`
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  color: #ffffff;
  margin: 0;
  margin-bottom: 2rem;
`

const Wrapper = styled.div``
