import { styled } from '@linaria/react'
import React from 'react'

import FundsSwitchOverview from '~/components/FundsSwitchOverview'
import PortfolioAllocation from '~/components/PortfolioAllocation'
import FullScreenSpinner from '~/components/Spinner/FullScreenSpinner'
import UserNameHeader from '~/components/UserNameHeader'
import { tm } from '~/styles/theme'

import Image from '../../components/Base/Image'

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
          alt="tick"
          className="tick-icon"
          src={WealthyImages.diamondTick}
          width={148}
          height={138}
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
  background: ${tm((t) => t.colors.primaryBgColor)};
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
  color: ${tm((t) => t.colors.white)};
  margin: 0;
  margin-bottom: 2rem;
`

const Wrapper = styled.div``
