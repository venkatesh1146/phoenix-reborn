import { styled } from '@linaria/react'
import React from 'react'

import Image from '../../components/Base/Image'
import Footer from '../../components/Footer'
import FundsSwitchOverview from '../../components/FundsSwitchOverview'
import Info from '../../components/Info/Info'
import FullScreenSpinner from '../../components/Spinner/FullScreenSpinner'

import { Divider, SubText, Text, Wrapper } from './styledComponents'

import { WealthyImages } from '~/assets'
import useMFSwitchProposal from '~/hooks/useMFSwitchProposal'

export default function ProposalAccepted() {
  const { proposalData, isLoading, getAMCLogos } = useMFSwitchProposal()
  return isLoading ? (
    <FullScreenSpinner />
  ) : (
    <Wrapper>
      <Image
        alt="diamond"
        className="diamond-tick"
        src={WealthyImages.diamondTick}
        height={148}
        width={148}
      />
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
