import { styled } from '@linaria/react'
import React from 'react'

import FundsSwitchOverview from '../FundsSwitchOverview'
import Image from '../Image'
import PortfolioAllocation from '../PortfolioAllocation'
import UserNameHeader from '../UserNameHeader'

import { WealthyImages } from '~/assets'

export default function ProposalProcessed() {
  return (
    <Wrapper>
      <HeaderSection>
        <UserNameHeader userName="Ashish" />
        <Image
          className="tick-icon"
          src={WealthyImages.diamondTick}
          width={'9.25rem'}
          height={'8.688rem'}
        />
        <Text>The investment proposal has been successfully processed!</Text>
        <FundsSwitchOverview
          wrapperClassName="funds-switch-wrapper"
          totalAmount={7000000}
          numberOfFunds={4}
          fundsIcons={[
            'https://i.wlycdn.com/bank-logos/kotak-mahindra-bank.png',
            'https://i.wlycdn.com/bank-logos/yes-bank.png',
            'https://i.wlycdn.com/bank-logos/idfc-first-bank.png',
            'https://i.wlycdn.com/bank-logos/indian-bank.png',
          ]}
        />
      </HeaderSection>
      <PortfolioAllocation
        switchFunds={[
          {
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
          },
          {
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
          },
        ]}
      />
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
