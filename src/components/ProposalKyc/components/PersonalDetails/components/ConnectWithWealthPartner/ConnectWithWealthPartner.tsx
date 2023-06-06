/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { styled } from '@linaria/react'
import PropTypes from 'prop-types'
import React from 'react'

const connectWithImage =
  'https://ik.imagekit.io/aboutUs/KYC/PoliticalExposure_YaMd6_Af3R.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1660736091708'

const propTypes = {
  agent: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
}

const ConnectWithWealthPartner = ({ agent, error, loading }: any) => {
  if (error || loading) {
    return null
  }

  return (
    <ConnectWithWealthPartnerWrapper>
      <Container>
        <DataContainer>
          <ImageContainer>
            <img
              alt="connect-with-wealth-partner"
              src={agent.imageUrl || connectWithImage}
            />
          </ImageContainer>
          <Title>
            Connect with your
            <br /> Wealth Partner
          </Title>
          <SubHeader>
            For politically exposed people, NRIs, or people with tax obligations
            outside india, we wish to ensure you the best services.
          </SubHeader>
          <PartnerCard>
            <Avatar />
            <WmNameContainer>
              <Name>{agent.name}</Name>
              <ConnectNowText>
                <a href={`mailto:${agent.email}`}>Connect Now</a>
              </ConnectNowText>
              <Summary>With Your Wealth Partner</Summary>
            </WmNameContainer>
          </PartnerCard>
          <GoToHomeContainer
            onClick={() => window.location.assign('/dashboard/investments')}
          >
            Go to Home
          </GoToHomeContainer>
        </DataContainer>
      </Container>
    </ConnectWithWealthPartnerWrapper>
  )
}

const ConnectWithWealthPartnerWrapper = styled.div`
  height: 100vh;
  width: 40%;
  position: relative;
  text-align: center;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Container = styled.div`
  padding: 2.4rem 0;
  width: 90%;
  margin: 0 auto;
`

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const ImageContainer = styled.div``

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 400;
  color: #000000;
  font-family: DmSerif;
  margin-top: 3.6rem;
  line-height: 1.4;
`

const SubHeader = styled.p`
  margin: 1rem 0 0 0;
  padding: 0;
  color: #7e7e7e;
  font-size: 1.4rem;
  font-weight: 400;
  font-family: MavenPro;
  margin-top: 1.6rem;
  max-width: 80%;
`

const PartnerCard = styled.div`
  background-color: #f6f2ff;
  border-radius: 4px;
  padding: 1.6rem;
  width: 100%;
  margin-top: 4.4rem;
  display: flex;
  align-items: center;
`

const Avatar = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: #ffffff;
  margin-right: 2rem;
`

const WmNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Name = styled.p`
  font-size: 1.6rem;
  color: #000000;
  font-weight: 500;
  font-family: MavenPro;
  margin-bottom: 0;
`

const ConnectNowText = styled(Name)`
  font-size: 1.4rem;
`

const Summary = styled(Name)`
  color: #7e7e7e;
  font-size: 1.4rem;
`

const GoToHomeContainer = styled.div`
  color: #6725f4;
  padding: 4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #dddddd;
  width: 100%;
  margin-top: 5rem;
  font-size: 1.6rem;
  cursor: pointer;
`

ConnectWithWealthPartner.propTypes = propTypes

export default ConnectWithWealthPartner
