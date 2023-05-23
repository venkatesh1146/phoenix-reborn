import { styled } from '@linaria/react'
import React from 'react'

import Footer from '../Footer'
import FundsSwitchOverview from '../FundsSwitchOverview'
import Image from '../Image'
import Info from '../Info/Info'
import FullScreenSpinner from '../Spinner/FullScreenSpinner'

import { WealthyImages } from '~/assets'
import useMFSwitchProposal from '~/hooks/useMFSwitchProposal'

export default function ProposalAccepted() {
  const { proposalData, isLoading, getAMCLogos } = useMFSwitchProposal()
  return isLoading ? (
    <FullScreenSpinner />
  ) : (
    <Wrapper>
      <Image src={WealthyImages.diamondTick} height={'9.28rem'} />
      <Text>Congratulations!</Text>
      <SubText>You have successfully accepted the Proposal</SubText>
      <Info
        text={
          'it usually takes 3-4 Days for all the funds to switch to wealthy'
        }
        wrapperClassName="info-text"
      />
      <Divider />
      <FundsSwitchOverview
        totalAmount={proposalData?.totalAmount}
        numberOfFunds={proposalData?.schemes?.length || ''}
        fundsIcons={getAMCLogos() ?? []}
      />
      <Footer btnTxt="Done" />
    </Wrapper>
  )
}
const Divider = styled.div`
  border: 0.2px solid #e6e6e6;
  height: 0;
  margin: 2rem 0 2.62rem 0;
`
const SubText = styled.p`
  font-family: 'Maven Pro';
  font-size: 0.9rem;
  text-align: center;
  color: #ffffff;
`
const Text = styled.p`
  font-family: 'Marcellus';
  font-size: 1.5rem;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  margin: 0;
`
const Wrapper = styled.div`
  height: 100%;
  width: 100vw;
  background: #1e1730;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .info-text {
    border: none;
  }
  .footer-wrapper {
    background: none;
  }
`
