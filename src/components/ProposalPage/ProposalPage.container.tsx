import { styled } from '@linaria/react'
import React from 'react'

import Footer from '../Footer'
import FundSwitchCard from '../FundSwitchCard'
import FundsCountWithAmount from '../FundsCountWithAmount/FundsCountWithAmount'
import Image from '../Image'
import UserNameHeader from '../UserNameHeader'

import { WealthyImages } from '~/assets'

export default function ProposalPage() {
  const partnerName = 'Venkatesh Pullaganti'

  return (
    <Wrapper className="desktop_container">
      <HeadSection>
        <UserNameHeader userName="Ashish" />
        <PartnerName>
          Here’s an Investment proposal shared by &nbsp;
          <span className="name">
            <Image
              height={'1.5rem'}
              width={'1.5rem'}
              src={WealthyImages.profilePicPlaceholder}
              className="profile-pic"
            />
            &nbsp;
            {partnerName}.
          </span>
          &nbsp; Please have a look!
        </PartnerName>
        <FundsCountWithAmount className={'funds-amount-wrapper'} />
      </HeadSection>
      <PortfolioAllocation>
        <Heading>
          Portfolio Allocation
          <FundsCount>4 Funds</FundsCount>
        </Heading>
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
      <Footer agentPhoneNumber={7093980011} />
    </Wrapper>
  )
}

const FundsCount = styled.p`
  color: #7e7e7e;
  font-size: 0.8rem;
  font-family: 'Maven Pro';
`
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
  background: #1e1730;
`

const PortfolioAllocation = styled.div`
  background: #f6f2ff;
  padding: 1.2rem 1.2rem 3.8rem 1.2rem;
  @media (min-width: 1100px) {
    border-radius: 16px;
  }
`
const Heading = styled.div`
  font-family: 'Marcellus';
  font-size: 1.25rem;
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
