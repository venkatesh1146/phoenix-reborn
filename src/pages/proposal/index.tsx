import { styled } from '@linaria/react'
import React, { useState } from 'react'

import { tm } from '~/styles/theme'

import Image from '../../components/Base/Image'
import Footer from '../../components/Footer'
import FundsCountWithAmount from '../../components/FundsCountWithAmount/FundsCountWithAmount'
import PortfolioAllocation from '../../components/PortfolioAllocation'
import FullScreenSpinner from '../../components/Spinner/FullScreenSpinner'
import UserNameHeader from '../../components/UserNameHeader'
import VerifyEmailsContainer from '../../components/VerifyEmails'

import { WealthyImages } from '~/assets'
import useMFSwitchProposal from '~/hooks/useMFSwitchProposal'

export default function ProposalPage() {
  const { isLoading, proposalData } = useMFSwitchProposal()
  const [isEmailVerification, setIsEmailVerification] = useState(false)

  const navigateToVerifyPage = () => {
    setIsEmailVerification(true)
  }

  return isLoading ? (
    <FullScreenSpinner />
  ) : isEmailVerification ? (
    <VerifyEmailsContainer proposalData={proposalData} isLoading={isLoading} />
  ) : (
    <Wrapper className="desktop_container">
      <HeadSection>
        <Image
          alt="logo"
          style={{ alignSelf: 'center' }}
          src={WealthyImages.wealthyLogoLinesOnBothSides}
          height={24}
          width={197}
        />
        <UserNameHeader userName={proposalData?.clientName} />
        <PartnerName>
          Here’s a proposal shared by your partner &nbsp;
          <span className="name">
            <Image
              alt="profile"
              height={24}
              width={24}
              src={WealthyImages.profilePicPlaceholder}
              className="profile-pic"
            />
            &nbsp;
            {proposalData?.partnerName}
          </span>
          &nbsp; to reallocate your mutual funds. Please have a look!
        </PartnerName>
        <FundsCountWithAmount
          amount={
            proposalData?.schemes.reduce(
              (prev: any, current: any) => prev + current.switchin.amount,
              0
            ) ?? 0
          }
          totalFunds={proposalData?.schemes.length}
          className={'funds-amount-wrapper'}
        />
      </HeadSection>
      <PortfolioAllocation switchFunds={proposalData?.schemes || []} />
      <Declaimer>*New Investments will come under Wealthy ARN</Declaimer>
      <Declaimer>*Capital Gains Tax will be Applicable</Declaimer>
      <Footer
        onClick={navigateToVerifyPage}
        agentPhoneNumber={proposalData?.partnerPhone}
      />
    </Wrapper>
  )
}

const Declaimer = styled.p`
  font-family: 'Maven Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 0.75rem;
  padding-left: 1.25rem;
  color: ${tm((t) => t.colors.secondaryTextColor)};
`
const HeadSection = styled.div`
  padding: 1.2rem;
  background: ${tm((t) => t.colors.primaryBgColor)};
  display: flex;
  flex-direction: column;
`
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${tm((t) => t.colors.lightBgColor)};
  padding-bottom: 7rem;
  .funds-amount-wrapper {
    margin-top: 0.8rem;
  }
`
const PartnerName = styled.p`
  color: ${tm((t) => t.colors.white)};
  font-size: 1rem;
  font-family: 'Maven Pro';
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  line-height: 27px;

  .name {
    font-weight: 500;
    color: #fde5b4;
    align-items: center;
    text-align: center;
    text-decoration: none;
    display: inline-flex;
    align-items: baseline;
  }
  .profile-pic {
    display: inline;
    align-self: center;
  }
`
