import React, { useEffect, useState } from 'react'

import Image from '../../components/Base/Image'
import Footer from '../../components/Footer'
import Info from '../../components/Info/Info'
import FullScreenSpinner from '../../components/Spinner/FullScreenSpinner'

import {
  Details,
  DoneStatus,
  HeadText,
  HeaderSection,
  KycCard,
  KycLink,
  KycStatus,
  PageHeading,
  PanNo,
  SubTxt,
  Text,
  Wrapper,
} from './styledComponents'

import { WealthyImages } from '~/assets'
import useMFSwitchProposal from '~/hooks/useMFSwitchProposal'

interface KycDataType {
  pending: {
    pan: string
    email: string
    kycUrl: string
  }[]
  completed: {
    pan: string
    email: string
  }[]
}

export default function KycVerification() {
  const { proposalData, isLoading, getProposal } = useMFSwitchProposal()
  const [kycData, setKycData] = useState<KycDataType | null>(null)

  useEffect(() => {
    const kycData: { pending: any[]; completed: any[] } = {
      pending: [],
      completed: [],
    }

    proposalData?.schemes.forEach((scheme) => {
      if (scheme.kycCompleted) {
        kycData.completed.push({
          pan: scheme?.pan,
          email: scheme.email,
        })
      } else {
        kycData.pending.push({
          pan: scheme?.pan,
          email: scheme.email,
          kycUrl: scheme.kycLink,
        })
      }
    })
    setKycData(kycData)
  }, [proposalData])

  return isLoading ? (
    <FullScreenSpinner />
  ) : (
    <Wrapper>
      <HeaderSection>
        <PageHeading>KYC Completion</PageHeading>
        <Text>
          We have found
          <span className="bold"> {3} pan cards</span> mapped to the funds
        </Text>
        <Info
          text={
            'To successfully process the Switch funds, Kindly complete the KYC for the below mentioned'
          }
        />
      </HeaderSection>
      <KycStatus>
        {kycData?.pending.length ? <HeadText>KYC Pending</HeadText> : null}
        {kycData?.pending.map((data, index) => (
          <KycCard key={index}>
            <Image
              alt="profile-icon"
              src={WealthyImages.profileCardIcon}
              height={16}
              width={24}
              className="profile-icon"
            />
            <Details>
              <PanNo>{data.pan}</PanNo>
              <SubTxt>{data.email}</SubTxt>
              {/* <SubTxt>{data?.phoneNumber}</SubTxt> */}
            </Details>
            <KycLink
              href={'https://www.wealthy.in/'}
              target={'_blank'}
              rel="noreferrer"
            >
              {'Complete KYC'}
            </KycLink>
          </KycCard>
        ))}

        {kycData?.completed?.length ? (
          <HeadText className="kyc-completion">KYC Completion</HeadText>
        ) : null}
        {kycData?.completed.map((data, index) => (
          <KycCard key={index}>
            <Image
              alt="profile-card"
              src={WealthyImages.profileCardIcon}
              height={16}
              width={24}
              className="profile-icon"
            />
            <Details>
              <PanNo>{data.pan}</PanNo>
              <SubTxt>{data.email}</SubTxt>
              {/* <SubTxt>{data.phoneNumber}</SubTxt> */}
            </Details>
            <DoneStatus>
              <Image
                width={22}
                height={22}
                alt="done"
                className="done-icon"
                src={WealthyImages.tickWithBgDesign}
              />
              KYC Done
            </DoneStatus>
          </KycCard>
        ))}
      </KycStatus>
      <Footer
        isDisabled={kycData?.pending?.length > 0}
        agentPhoneNumber={proposalData?.partnerPhone}
        btnTxt="Proceed"
        onClick={getProposal}
        isLoading={isLoading}
      />
    </Wrapper>
  )
}
