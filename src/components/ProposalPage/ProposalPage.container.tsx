import { styled } from '@linaria/react'
import React from 'react'

import { FooterButton } from '../Buttons'
import FundSwitchCard from '../FundSwitchCard'
import FundsCountWithAmount from '../FundsCountWithAmount/FundsCountWithAmount'
import UserNameHeader from '../UserNameHeader'

export default function ProposalPage() {
  const partnerName = 'Venkatesh Pullaganti'

  return (
    <Wrapper className="desktop_container">
      <HeadSection>
        <UserNameHeader userName="Ashish" />
        <PartnerName>
          Your wealth partner <span className="name">{partnerName}</span> has
          shared a proposal
        </PartnerName>
        <FundsCountWithAmount className={'funds-amount-wrapper'} />
      </HeadSection>
      <PortfolioAllocation>
        <Heading>Portfolio Allocation</Heading>
        <FundSwitches>
          <FundSwitchCard
            WrapperClassName={'fund-switch-wrapper'}
            data={{
              from: {
                fundName: 'Nippon Growth Fund',
                units: 52.3,
                amount: 50000,
                logoUrl:
                  'https://i.wlycdn.com/bank-logos/kotak-mahindra-bank.png',
              },
              to: {
                fundName: 'Axis Blue Chip Fund',
                units: 52.3,
                amount: 50000,
                logoUrl: 'https://i.wlycdn.com/credit_card/axis-bank-png.png',
              },
            }}
          />
          <FundSwitchCard
            WrapperClassName={'fund-switch-wrapper'}
            data={{
              from: {
                fundName: 'Nippon Growth Fund',
                units: 52.3,
                amount: 50000,
                logoUrl:
                  'https://i.wlycdn.com/bank-logos/kotak-mahindra-bank.png',
              },
              to: {
                fundName: 'Axis Blue Chip Fund',
                units: 52.3,
                amount: 50000,
                logoUrl: 'https://i.wlycdn.com/credit_card/axis-bank-png.png',
              },
            }}
          />
        </FundSwitches>
      </PortfolioAllocation>
      <FooterButton
        onClick={console.log}
        className="mobile-floating-footer-btn desktop_footer_btn"
        primary
      >
        Verify and Proceed
      </FooterButton>
    </Wrapper>
  )
}

const FundSwitches = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
  .fund-switch-wrapper {
    margin: 0.5rem;
  }
`

const HeadSection = styled.div`
  padding: 1.5rem;
`

const PortfolioAllocation = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
  @media (min-width: 1100px) {
    border-radius: 16px;
  }
`
const Heading = styled.p`
  font-family: 'Marcellus';
  font-size: 1.25rem;
  text-transform: capitalize;
`
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding-bottom: 7rem;
  .funds-amount-wrapper {
    margin-top: 2rem;
  }
`
const PartnerName = styled.p`
  font-size: 1rem;
  font-family: 'Maven Pro';
  .name {
    font-weight: 500;
  }
`
