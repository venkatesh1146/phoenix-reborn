import { styled } from '@linaria/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { getMFSwitchUrlWithProposalId } from '~/utils/UrlUtils'

import Footer from '../Footer'
import Info from '../Info/Info'
import FullScreenSpinner from '../Spinner/FullScreenSpinner'

import EmailContainer from './Email'

import { MFSwitchStatusResponseType } from '~/constants/interfaces'
import { MF_SWITCH_ROUTES } from '~/constants/routes'

interface VerifyEmailsContainerPropsType {
  proposalData: MFSwitchStatusResponseType | null
  isLoading: boolean
}

export default function VerifyEmailsContainer({
  proposalData,
  isLoading,
}: VerifyEmailsContainerPropsType) {
  const [emails, setEmail] = useState<{ email: string; isVerified: boolean }[]>(
    []
  )
  const router = useRouter()
  const isAllEmailsVerified =
    emails.findIndex((e) => e.isVerified === false) < 0

  useEffect(() => {
    const emails = proposalData?.schemes.reduce<
      { email: string; isVerified: boolean }[]
    >((list, current) => {
      const email = current.email
      if (list.findIndex((item) => item.email === email) < 0)
        list.push({
          email: email || '',
          isVerified: Boolean(current.customerApproved),
        })
      return list
    }, [])
    setEmail(emails ?? [])
  }, [])

  const onVerifyEmail = (emailId: string) => {
    const index = emails.findIndex((email) => email.email === emailId)
    if (index < 0) return

    const updatedEmails = [...emails]
    updatedEmails[index].isVerified = true
    setEmail(updatedEmails)
  }

  const handleProceed = () => {
    proposalData?.ticketNumber &&
      router.push(
        getMFSwitchUrlWithProposalId(
          MF_SWITCH_ROUTES.kycVerification,
          proposalData?.ticketNumber
        )
      )
  }

  return isLoading ? (
    <FullScreenSpinner />
  ) : (
    <Wrapper>
      <HeaderSection>
        <PageHeading>Verify Email</PageHeading>
        <Body>
          <Text>
            We have found the
            <span className="bold"> {emails?.length} email IDs</span> mapped to
            the funds
          </Text>
          <Info
            text={
              'As per SEBI guidelines, you are required to verify email via OTP to proceed with fund switch'
            }
          />
        </Body>
      </HeaderSection>
      <EmailsSection>
        <Heading>Verify the below Emails</Heading>
        <Emails>
          {emails?.map((eachMail) => (
            <EmailContainer
              key={eachMail.isVerified + eachMail.email}
              email={eachMail.email}
              isVerified={eachMail.isVerified}
              proposalId={proposalData?.ticketNumber || ''}
              userId={proposalData?.userid || ''}
              onVerify={onVerifyEmail}
            />
          ))}
        </Emails>
      </EmailsSection>
      <Footer
        isDisabled={!isAllEmailsVerified}
        agentPhoneNumber={proposalData?.partnerPhone}
        onClick={handleProceed}
      />
    </Wrapper>
  )
}

const PageHeading = styled.p`
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 21px;

  color: #ffffff;
`
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
    margin: 1rem 0;
  }
`
const Heading = styled.div`
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
`
const HeaderSection = styled.div`
  padding: 1.25rem;
  background: #1e1730;
  color: #fff;
`
const EmailsSection = styled.div`
  background: #f6f2ff;
  padding: 2rem 1.8rem;
  flex-grow: 1;
`

const Wrapper = styled.div`
  background-color: #ffffff;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  font-family: 'Maven Pro';
  display: flex;
  flex-direction: column;
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
  .bold {
    font-weight: 500;
  }
`
