import { styled } from '@linaria/react'
import React from 'react'

import { TextButton } from '../Buttons'
import Footer from '../Footer'
import Image from '../Image'
import Info from '../Info/Info'

import { WealthyImages } from '~/assets'

export default function KycVerification() {
  return (
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
        <HeadText>KYC Pending</HeadText>
        <KycCard>
          <Image
            src={WealthyImages.profileCardIcon}
            height={'1rem'}
            width={'1.5rem'}
            className="profile-icon"
          />
          <Details>
            <PanNo>{'DAKA5638HD'}</PanNo>
            <SubTxt>{'naman.bajaj@gmail.com'}</SubTxt>
            <SubTxt>{'+91-9912345633'}</SubTxt>
          </Details>
          <TextButton
            style={{ marginTop: '-4px', height: '1rem' }}
            onClick={console.log}
          >
            {'Complete KYC'}
          </TextButton>
        </KycCard>

        <HeadText className="kyc-completion">KYC Completion</HeadText>
        <KycCard>
          <Image
            src={WealthyImages.profileCardIcon}
            height={'1rem'}
            width={'1.5rem'}
            className="profile-icon"
          />
          <Details>
            <PanNo>{'DAKA5638HD'}</PanNo>
            <SubTxt>{'naman.bajaj@gmail.com'}</SubTxt>
            <SubTxt>{'+91-9912345633'}</SubTxt>
          </Details>
          <DoneStatus>
            <Image className="done-icon" src={WealthyImages.tickWithBgDesign} />
            KYC Done
          </DoneStatus>
        </KycCard>
      </KycStatus>
      <Footer
        isDisabled={true}
        agentPhoneNumber={7093980011}
        btnTxt="Proceed"
      />
    </Wrapper>
  )
}

const DoneStatus = styled.div`
  color: #14b195;
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 14px;
  text-align: center;
  height: max-content;
  display: flex;
  align-items: center;
  .done-icon {
    margin-right: 0.5rem;
  }
`

const SubTxt = styled.p`
  font-family: 'Maven Pro';
  font-size: 0.75rem;
  color: #7e7e7e;
  margin: 8px 0;
`
const Details = styled.div`
  flex-grow: 1;
`
const PanNo = styled.p`
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 0.75rem;
  color: #000000;
  margin: 0;
`
const KycCard = styled.div`
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  padding: 1.25rem;
  margin: 1rem 0;
  .profile-icon {
    margin-right: 0.75rem;
  }
`

const HeadText = styled.p`
  font-family: 'Maven Pro';
  font-size: 0.75rem;
  line-height: 14px;
  color: #7e7e7e;
  margin: 0;
  margin-bottom: 1rem;
`
const KycStatus = styled.div`
  background: #f6f2ff;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1.5rem 1.25rem;
  .kyc-completion {
    margin-top: 2rem;
  }
`
const Wrapper = styled.div`
  height: 100vh;
  font-family: 'Maven Pro';
  display: flex;
  flex-direction: column;
`

const HeaderSection = styled.div`
  padding: 1.25rem;
  background: #1e1730;
  color: #fff;
`
const Body = styled.div`
  flex-grow: 1;
`
const PageHeading = styled.p`
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 21px;

  color: #ffffff;
`
const Text = styled.p`
  font-family: 'Maven Pro';
  font-size: 1rem;
  margin-bottom: 32px;
  .bold {
    font-weight: 500;
  }
`
