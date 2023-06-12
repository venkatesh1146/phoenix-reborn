import { styled } from '@linaria/react'
import React, { useState } from 'react'

import DesktopLeftSection from '~/components/DesktopLeftSection'
import { tm } from '~/styles/theme'

import Image from '../../../components/Base/Image'
import Footer from '../../../components/Footer'
import FundsCountWithAmount from '../../../components/FundsCountWithAmount/FundsCountWithAmount'
import PortfolioAllocation from '../../../components/PortfolioAllocation'
import UserNameHeader from '../../../components/UserNameHeader'
import VerifyEmailsContainer from '../../../components/VerifyEmails'
import FullScreenSpinner from '../../../components/common/Spinner/FullScreenSpinner'

import { WealthyImages } from '~/assets'
import { useIsDesktop } from '~/hooks/useIsDesktop'
import useMFSwitchProposal from '~/hooks/useMFSwitchProposal'

export default function ProposalPage() {
  const { isLoading, proposalData } = useMFSwitchProposal()
  const [isEmailVerification, setIsEmailVerification] = useState(false)
  const isDesktop = useIsDesktop()

  const navigateToVerifyPage = () => {
    setIsEmailVerification(true)
  }

  const renderEmailVerificationUI = () => (
    <VerifyEmailsContainer proposalData={proposalData} isLoading={isLoading} />
  )

  const renderProposalHomePageUI = () => {
    const fundDetails = (
      <>
        <PortfolioAllocation
          wrapperClassName="funds-cards-container"
          switchFunds={proposalData?.schemes || []}
        />
        <Declaimer>*New Investments will come under Wealthy ARN</Declaimer>
        <Declaimer>*Capital Gains Tax will be Applicable</Declaimer>
        <Footer
          onClick={navigateToVerifyPage}
          agentPhoneNumber={proposalData?.partnerPhone}
          btnTxt="Proceed"
        />
      </>
    )
    const greetingAndPartnerName = (
      <>
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
      </>
    )
    if (isDesktop)
      return (
        <Wrapper>
          <DesktopLeftSection
            footerTxt={
              'New investments will come under Wealthy ARN Capital Gain Taxes will be applicable'
            }
            childrenContainerStyles={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '1.5rem',
            }}
          >
            <>
              {greetingAndPartnerName}
              {/* <OutlinedButton
                onClick={console.log}
                className="mf-switch-connect-with-partner-btn"
              >
                <Image
                  src={WealthyImages.callIconWhite}
                  alt="contact"
                  height={18}
                  width={18}
                  style={{ marginRight: '1rem' }}
                />
                {'Connect with Partner'}
              </OutlinedButton> */}
            </>
          </DesktopLeftSection>
          <DesktopRightSection
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
            }}
          >
            <FundsCountWithAmount
              amount={proposalData?.totalAmount}
              totalFunds={proposalData?.schemes.length}
              className={'funds-amount-wrapper'}
            />
            {fundDetails}
          </DesktopRightSection>
        </Wrapper>
      )
    return (
      <Wrapper>
        <HeadSection>
          <Image
            alt="logo"
            style={{ alignSelf: 'center' }}
            src={WealthyImages.wealthyLogoLinesOnBothSides}
            height={24}
            width={197}
          />
          {greetingAndPartnerName}
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
        {fundDetails}
      </Wrapper>
    )
  }

  if (isLoading) return <FullScreenSpinner />
  else if (isEmailVerification) return renderEmailVerificationUI()
  return renderProposalHomePageUI()
}

const DesktopRightSection = styled.div`
  flex-grow: 1;
  padding: 2.5rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: auto;
`

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
  @media (min-width: 1024px) {
    flex-direction: row;
    display: flex;
    padding: 0;
    .funds-cards-container {
      padding: 0 !important;
      margin-top: 2.5rem;
      flex-grow: 1;
    }
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
