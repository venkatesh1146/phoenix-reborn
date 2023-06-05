import { styled } from '@linaria/react'
import React from 'react'

import { DesktopRightSection } from '~/components/CommonStyledComponents'
import DesktopLeftSection from '~/components/DesktopLeftSection'
import FundsSwitchOverview from '~/components/FundsSwitchOverview'
import PortfolioAllocation from '~/components/PortfolioAllocation'
import FullScreenSpinner from '~/components/Spinner/FullScreenSpinner'
import UserNameHeader from '~/components/UserNameHeader'
import { tm } from '~/styles/theme'

import Image from '../../components/Base/Image'

import { WealthyImages } from '~/assets'
import { useIsDesktop } from '~/hooks/useIsDesktop'
import useMFSwitchProposal from '~/hooks/useMFSwitchProposal'

export default function ProposalProcessed() {
  const { proposalData, isLoading, getAMCLogos } = useMFSwitchProposal()
  const isDesktop = useIsDesktop()
  const imageSize = isDesktop
    ? { width: 236, height: 221 }
    : { width: 148, height: 138 }

  const renderHeaderOrSidebarData = () => (
    <>
      {' '}
      <UserNameHeader userName={proposalData?.clientName} />
      <Image
        alt="tick"
        className="tick-icon"
        src={WealthyImages.diamondTick}
        {...imageSize}
      />
      <Text>The investment proposal has been successfully processed!</Text>
    </>
  )

  const renderPortfolioAllocation = () => (
    <PortfolioAllocation
      wrapperClassName="portfolio-allocation"
      switchFunds={proposalData?.schemes ?? []}
      showEachFundStatus={true}
    />
  )

  const RenderFundsSwitchOverview = () => (
    <FundsSwitchOverview
      wrapperClassName="funds-switch-wrapper"
      totalAmount={proposalData?.totalAmount}
      numberOfFunds={proposalData?.schemes.length ?? ''}
      fundsIcons={getAMCLogos() ?? []}
    />
  )

  if (isLoading) return <FullScreenSpinner />
  else if (isDesktop)
    return (
      <Wrapper>
        <DesktopLeftSection
          childrenContainerStyles={{ display: 'flex', flexDirection: 'column' }}
        >
          {renderHeaderOrSidebarData()}
        </DesktopLeftSection>
        <DesktopRightSection>
          <RenderFundsSwitchOverview />
          {renderPortfolioAllocation()}
        </DesktopRightSection>
      </Wrapper>
    )
  return (
    <Wrapper>
      <HeaderSection>
        {renderHeaderOrSidebarData()}
        <RenderFundsSwitchOverview />
      </HeaderSection>
      {renderPortfolioAllocation()}
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

const Wrapper = styled.div`
  height: 100%;
  @media screen and (min-width: 1024px) {
    display: flex;
    .tick-icon {
      align-self: center;
    }
    .portfolio-allocation {
      padding: 0;
      margin-top: 0.7rem;
    }
    .portfolio-funds-wrapper {
      margin-top: 0.8rem;
    }
  }
`
