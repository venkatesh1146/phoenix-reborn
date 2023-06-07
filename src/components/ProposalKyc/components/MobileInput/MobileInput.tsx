/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import React from 'react'

import { PrimaryButton } from '~/components/Base/Buttons'
import Icon from '~/components/Base/Icon'
import Image from '~/components/Base/Image'
import Input from '~/components/Base/Input'
import Text from '~/components/Base/Text'

import Family from '../Family'

import { WealthyImages } from '~/assets'

interface MobileInputPropTypes {
  dispatch: Function
  handleMobileCode: Function
  isCodeEditing: boolean
  onChangeHandler: Function
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  selectedCountry: Record<string, any>
  state: Record<string, any>
  user: Record<string, any>
}

const MobileInput = ({
  dispatch,
  handleMobileCode,
  onChangeHandler,
  onSubmit,
  selectedCountry,
  state,
  isCodeEditing,
  user,
}: MobileInputPropTypes) => {
  const rendered = user.families.length
    ? user.phoneDeclaration.template
        .replace('{name}', user.name)
        .replace('{relation}', `my ${state.phoneRelation}`)
    : user.phoneDeclaration.rendered

  return (
    <MobileInputWrapper>
      <Container>
        <Title>Choose phone number for investment</Title>
        <InputsContainer>
          {user.families.length ? (
            <Family isMobile dispatch={dispatch} user={user} />
          ) : null}
          <form onSubmit={onSubmit}>
            <Label>Mobile Number</Label>
            <MobileSection isError={false}>
              <CountryCode>
                <Input
                  inputType="registration"
                  isDisabled={state.isPhoneVerified}
                  name="mobileCode"
                  placeholder="eg: +971"
                  value={state.countryCode}
                  onChange={handleMobileCode}
                />
              </CountryCode>
              <PhoneNumberInput
                inputType="registration"
                isDisabled={state.isPhoneVerified}
                isError={false}
                name="phoneNumber"
                placeholder=""
                value={state.phoneNumber}
                width="full"
                onChange={onChangeHandler}
              />
              <SelectedCountry>
                {isCodeEditing && !selectedCountry[0] && (
                  <Image alt="ellipses" src={WealthyImages.ellipsis} />
                )}
                {selectedCountry && (
                  <Text>
                    {selectedCountry.map((country: any) => {
                      return `${country.name}${
                        selectedCountry[selectedCountry.length - 1] === country
                          ? ''
                          : ', '
                      }`
                    })}
                  </Text>
                )}
              </SelectedCountry>
              <VerificationStatus status={state.isPhoneVerified}>
                {state.isPhoneVerified && <Icon name="wl-icon-check-circle" />}
              </VerificationStatus>
            </MobileSection>
            <p>{rendered}</p>
            <PrimaryButton
              disabled={
                !state.isPhoneVerified ? state.phoneNumber.length !== 10 : false
              }
              style={{ margin: '3em 0' }}
              onClick={onSubmit}
            >
              Proceed
            </PrimaryButton>
          </form>
        </InputsContainer>
      </Container>
    </MobileInputWrapper>
  )
}

const MobileInputWrapper = styled.div`
  height: 100vh;
  width: 50%;
  margin: 0 auto;
  position: relative;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Container = styled.div`
  padding: 2.4rem 0;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 400;
  color: #000000;
  font-family: DmSerif;
`

const Label = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: #7e7e7e;
`

const PhoneNumberInput = styled(Input)`
  border: ${(props: any) => (props.isError ? '1px solid #f21976' : '')};
  box-shadow: ${(props: any) => (props.isError ? '0 0 10px #f21976' : '')};
`

const InputsContainer = styled.div`
  margin: 3rem 0 0 0;
  width: 60%;
  @media (max-width: 768px) {
    width: 90%;
  }
`

const MobileSection = styled.div<any>`
  display: grid;
  position: relative;
  grid-template-columns: 1.5fr 5fr;
  grid-gap: 0.5em 1em;
  width: 100%;
`

const CountryCode = styled.div`
  > div {
    width: auto;
    input {
      &::placeholder {
        font-size: 0.7em;
      }
    }
  }
`

const SelectedCountry = styled.div`
  height: 1em;
  grid-column: 1/3;
  width: auto;
  display: flex;
  align-items: center;
  padding-left: 1em;
  margin-bottom: -1em;
  img {
    height: 3em;
  }
  > p {
    font-size: 0.9em;
    color: var(--gray);
  }
`

const VerificationStatus = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  /* float: right; */
  margin-top: 4em;
  position: absolute;
  right: 1em;
  color: ${(props) => (props.status ? '#51a905' : 'red')};
  text-transform: uppercase;
  font-size: 0.8em;
  i {
    margin-right: 0.5em;
    margin-bottom: 4px;
    color: #51a905;
    font-size: 1.25em;
  }
`

export default MobileInput
