import { styled } from '@linaria/react'
import React, { useState } from 'react'

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
        <UserNameHeader userName={proposalData?.clientName} />
        <PartnerName>
          Here’s an Investment proposal shared by &nbsp;
          <span className="name">
            <Image
              alt="profile"
              height={24}
              width={24}
              src={WealthyImages.profilePicPlaceholder}
              className="profile-pic"
            />
            &nbsp;
            {proposalData?.partnerName}.
          </span>
          &nbsp; Please have a look!
        </PartnerName>
        <FundsCountWithAmount
          amount={
            proposalData?.schemes.reduce(
              (prev, current) => prev + current.switchin.amount,
              0
            ) ?? 0
          }
          className={'funds-amount-wrapper'}
        />
      </HeadSection>
      <PortfolioAllocation switchFunds={proposalData?.schemes || []} />
      <Footer
        onClick={navigateToVerifyPage}
        agentPhoneNumber={proposalData?.partnerPhone}
      />
    </Wrapper>
  )
}

const HeadSection = styled.div`
  padding: 1.5rem;
  background: #1e1730;
`
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding-bottom: 7rem;
  .funds-amount-wrapper {
    margin-top: 0.8rem;
  }
`
const PartnerName = styled.p`
  color: #ffffff;
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
