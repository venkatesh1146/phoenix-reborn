import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { getMFSwitchUrlWithProposalId } from '~/utils/UrlUtils'

import DesktopLeftSection from '../DesktopLeftSection'
import Footer from '../Footer'
import Info from '../Info/Info'
import ProgressCircle from '../ProgressCircle'
import FullScreenSpinner from '../Spinner/FullScreenSpinner'

import EmailContainer from './Email'
import {
  Body,
  Emails,
  EmailsSection,
  HeaderSection,
  Heading,
  PageHeading,
  Text,
  Wrapper,
} from './styledComponents'

import { MFSwitchStatusResponseType } from '~/constants/interfaces'
import { MF_SWITCH_ROUTES } from '~/constants/routes'
import { useIsDesktop } from '~/hooks/useIsDesktop'

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
  const verifiedEmailsCount = emails.filter((e) => e.isVerified).length
  const isDesktop = useIsDesktop()
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

  if (isLoading) return <FullScreenSpinner />
  else if (isDesktop)
    return (
      <Wrapper>
        <DesktopLeftSection
          footerTxt={
            'As per SEBI guidelines, you are required to verify email via OTP to process reallocation of funds.'
          }
          childrenContainerStyles={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '3rem',
          }}
        >
          <>
            <PageHeading>Verify Email</PageHeading>
            <Body>
              <Text>
                We have found the
                <span className="bold"> {emails?.length} email IDs</span> mapped
                to the funds
              </Text>
            </Body>
          </>
        </DesktopLeftSection>
      </Wrapper>
    )
  return (
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
        <Heading>
          Verify the below Emails
          <ProgressCircle
            wrapperClassName={'progress-circle-wrapper'}
            size={32}
            indicatorCap={'square'}
            indicatorWidth={6}
            trackWidth={4}
            progress={(verifiedEmailsCount / emails.length) * 100}
            variant="textOnRight"
          />
        </Heading>
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
