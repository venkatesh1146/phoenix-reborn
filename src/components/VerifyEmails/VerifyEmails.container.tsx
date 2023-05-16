import { styled } from '@linaria/react'
import React from 'react'

import { FooterButton } from '../Buttons'
import Info from '../Info/Info'
import UserNameHeader from '../UserNameHeader'

import EmailContainer from './Email'

export default function VerifyEmailsContainer() {
  return (
    <Wrapper>
      <HeaderSection>
        <UserNameHeader userName="Thor" />
        <Body>
          <Text>{`We have found the following email IDs mapped to the funds`}</Text>
          <Info
            text={
              'As per SEBI guidelines, you are required to verify email via OTP to proceed with fund switch'
            }
          />
        </Body>
      </HeaderSection>
      <EmailsSection>
        <Heading>{3} Emails associated with investments</Heading>
        <Emails>
          <EmailContainer email="venkat.ashish@gmail.com" isVerified={false} />
          <EmailContainer email="venkat.ashish@gmail.com" isVerified={false} />
          <EmailContainer email="venkat.ashish@gmail.com" isVerified={false} />
          <EmailContainer email="venkat.ashish@gmail.com" isVerified={false} />
          <EmailContainer email="venkat.ashish@gmail.com" isVerified={false} />
          <EmailContainer email="venkat.ashish@gmail.com" isVerified={false} />
        </Emails>
      </EmailsSection>
      <FooterButton
        onClick={console.log}
        className="footer-btn desktop_footer_btn"
        primary
      >
        Verify and Proceed
      </FooterButton>
    </Wrapper>
  )
}

const Emails = styled.div`
  margin-bottom: 6rem;

  @media (min-width: 1024px) {
    display: flex;
    flex-wrap: wrap;

    .email-wrapper {
      margin: 0.5rem !important;
      min-width: 28.125rem;
    }
  }
  .email-wrapper {
    margin: 0.5rem 0;
  }
`
const Heading = styled.div`
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 1.25rem;
  margin-bottom: 3rem;
`
const HeaderSection = styled.div`
  padding: 1.25rem;
`
const EmailsSection = styled.div`
  background: #f9f9f9;
  padding: 2rem 1.8rem;
`

const Wrapper = styled.div`
  background-color: #ffffff;
  height: 100vh;
  width: 100vw;
  font-family: 'Maven Pro';
  @media (min-width: 1024px) {
    max-width: 1100px;
    margin: auto;
  }
  .footer-btn {
    @media screen and (max-width: 780px) {
      max-width: 300px;
      transform: translate(-50%);
      left: 50%;
    }
  }
`

const Body = styled.div`
  flex-grow: 1;
`
const Text = styled.p`
  font-family: 'Maven Pro';
  font-size: 1rem;
  margin-bottom: 32px;
`
