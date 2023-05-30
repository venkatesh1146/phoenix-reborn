import React, { useEffect, useState } from 'react'

import ProgressCircle from '~/components/ProgressCircle'

import Image from '../../components/Base/Image'
import Footer from '../../components/Footer'
import Info from '../../components/Info/Info'
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
} from '../../components/KycVerification/styledComponents'
import FullScreenSpinner from '../../components/Spinner/FullScreenSpinner'

import { WealthyImages } from '~/assets'
import useMFSwitchProposal from '~/hooks/useMFSwitchProposal'

interface KycDataType {
  pending: {
    pan: string
    email: string
    kycUrl: string
    phoneNumber?: string
  }[]
  completed: {
    pan: string
    email: string
    phoneNumber?: string
  }[]
}

export default function KycVerification() {
  const { proposalData, isLoading, getProposal, isSuccess } =
    useMFSwitchProposal()
  const [kycData, setKycData] = useState<KycDataType | null>(null)

  useEffect(() => {
    if (isSuccess) {
      const kycData: { pending: any[]; completed: any[] } = {
        pending: [],
        completed: [],
      }

      proposalData?.schemes.forEach((scheme: any) => {
        if (scheme.kycCompleted) {
          kycData.completed.push({
            pan: scheme?.pan,
            email: scheme.email,
            phoneNumber: scheme.phoneNumber,
          })
        } else {
          kycData.pending.push({
            pan: scheme?.pan,
            email: scheme.email,
            kycUrl: scheme.kycLink,
            phoneNumber: scheme.phoneNumber,
          })
        }
      })
      setKycData(kycData)
    }
  }, [isSuccess, proposalData?.schemes])

  const totalPans = kycData
    ? kycData.completed.length + kycData.pending.length
    : 0

  return isLoading ? (
    <FullScreenSpinner />
  ) : (
    <Wrapper>
      <HeaderSection>
        <PageHeading>KYC Completion</PageHeading>
        <Text>
          We have found
          <span className="bold"> {totalPans} pan cards</span> mapped to the
          funds
        </Text>
        <Info
          text={
            'To successfully process the Switch funds, Kindly complete the KYC for the below mentioned'
          }
        />
      </HeaderSection>
      <KycStatus>
        {kycData?.pending.length ? (
          <HeadText>
            KYC Pending
            <ProgressCircle
              wrapperClassName={'progress-circle-wrapper'}
              size={32}
              indicatorCap={'square'}
              indicatorWidth={6}
              trackWidth={4}
              progress={(kycData.completed.length / totalPans) * 100}
              variant="textOnRight"
            />
          </HeadText>
        ) : null}
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
              {data?.phoneNumber ? <SubTxt>{data?.phoneNumber}</SubTxt> : null}
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
          <HeadText className="kyc-completion">
            KYC Completion
            {kycData?.pending.length === 0 ? (
              <ProgressCircle
                wrapperClassName={'progress-circle-wrapper'}
                size={32}
                indicatorCap={'square'}
                indicatorWidth={6}
                trackWidth={4}
                progress={100}
                variant="textOnRight"
              />
            ) : null}
          </HeadText>
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
              {data?.phoneNumber ? <SubTxt>{data?.phoneNumber}</SubTxt> : null}
            </Details>
            <DoneStatus>
              <Image
                width={22}
                height={22}
                alt="done"
                className="done-icon"
                src={WealthyImages.tickWithBgDesign}
              />
            </DoneStatus>
          </KycCard>
        ))}
      </KycStatus>
      <Footer
        isDisabled={kycData ? kycData?.pending?.length > 0 : true}
        agentPhoneNumber={proposalData?.partnerPhone}
        btnTxt="Proceed"
        onClick={getProposal}
        isLoading={isLoading}
      />
    </Wrapper>
  )
}
