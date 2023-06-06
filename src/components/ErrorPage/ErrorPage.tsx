/**
 Author - Venkatesh Pullaganti😁
 Git - https://github.com/venkatesh1146
 **/

import { styled } from '@linaria/react'
import React from 'react'

import { WealthyImages } from '~/assets'

const FailureImage = WealthyImages.failureIcon

interface ErrorPagePropsTypes {
  customError?: string
  redirectTo?: string
}

const ErrorPage = ({
  customError = 'Something went wrong!',
  redirectTo = '',
}: ErrorPagePropsTypes) => {
  const params = new URL(window.location).searchParams
  const message = params.get('message')
  const title = customError
  const subtitle = customError
    ? ''
    : message || 'Please contact support@wealthy.in'

  return (
    <Wrapper>
      <Image src={FailureImage} />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Button href={`${redirectTo ? redirectTo : '/redirect'}`}>
        {redirectTo ? 'Go back and Retry' : 'Go to Login/Dashboard'}
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  max-width: 600px;
  margin: auto;
`

const Image = styled.img`
  width: 50%;
  max-width: 250px;
  margin: 8rem auto 4rem;
`

const Title = styled.p`
  color: #4a4a4a;
  font-size: 18px;
  padding: 0 2rem;
  margin: 0;
`

const Subtitle = styled.p`
  color: #193076;
  font-size: 24px;
  font-weight: 900;
  padding: 0 3rem;
`

const Button = styled.a`
  background-color: #f21976;
  width: 50%;
  margin: 3rem auto 2rem;
  border-radius: 25px;
  padding: 14px;
  color: white;
  border: none;
  font-size: 15px;
  font-family: Avenir;
  font-weight: 600;
  text-decoration: none;
`
export default ErrorPage
