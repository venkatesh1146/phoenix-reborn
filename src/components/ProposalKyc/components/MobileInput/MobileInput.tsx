/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import React from 'react'

import { FooterButton, PrimaryButton } from '~/components/Base/Buttons'
import Icon from '~/components/Base/Icon'
import Image from '~/components/Base/Image'
import Input from '~/components/Base/Input'
import Text from '~/components/Base/Text'
import Footer from '~/components/Footer'
import { tm } from '~/styles/theme'

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
      <InputsContainer>
        {user.families.length ? (
          <Family isMobile dispatch={dispatch} user={user} />
        ) : null}
        <form onSubmit={onSubmit}>
          <Label className="section-title">Mobile Number</Label>
          <MobileSection isError={false}>
            <div style={{ margin: '0 0.5rem' }}>
              <Input
                inputType="registration"
                isDisabled={state.isPhoneVerified}
                name="mobileCode"
                placeholder="eg: +971"
                value={state.countryCode}
                onChange={handleMobileCode}
                className="mobile-code"
                width="small"
                containerStyles={{ width: '3.5rem' }}
              />
              <SelectedCountry>
                {isCodeEditing && !selectedCountry[0] && (
                  <Image
                    height={24}
                    width={24}
                    alt="ellipses"
                    src={WealthyImages.ellipsis}
                  />
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
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <PhoneNumberInput
                inputType="registration"
                isDisabled={state.isPhoneVerified}
                isError={false}
                name="phoneNumber"
                placeholder=""
                value={state.phoneNumber}
                onChange={onChangeHandler}
                width="small"
                showVerifiedBadge={state.isPhoneVerified}
              />
            </div>
          </MobileSection>
          <Text style={{ textAlign: 'left' }}>{rendered}</Text>
          <PrimaryButton
            disabled={
              !state.isPhoneVerified ? state.phoneNumber.length !== 10 : false
            }
            style={{ marginTop: 'auto' }}
            onClick={onSubmit}
          >
            Proceed
          </PrimaryButton>
        </form>
      </InputsContainer>
    </MobileInputWrapper>
  )
}

const MobileInputWrapper = styled.div`
  position: relative;
  text-align: center;
  flex-grow: 1;
  display: flex;
  .mobile-code {
    width: 3.5rem;
  }
`

const Label = styled.p`
  text-align: left;
  font-family: 'DM Serif Display';
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 22px;
  text-transform: capitalize;
  margin-top: 0;
  color: ${tm((t) => t.colors.secondaryTextColor)};
`

const PhoneNumberInput = styled(Input)`
  border: ${(props: any) => (props.isError ? '1px solid #f21976' : '')};
  box-shadow: ${(props: any) => (props.isError ? '0 0 10px #f21976' : '')};
`

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const MobileSection = styled.div<any>`
  .mobile-code {
    width: 3.5rem;
  }
  input {
    &::placeholder {
      font-size: 0.7em;
    }
    height: 2rem;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    padding: 0 6px;
  }
  display: flex;
  align-items: start;
  padding-bottom: 1rem;
`

const SelectedCountry = styled.div`
  height: 1em;
  grid-column: 1/3;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
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
  position: absolute;
  z-index: 10;
  right: 1rem;
  top: 0.5rem;
  @media screen and (min-width: 1024px) {
    top: 0.8rem;
  }
`

export default MobileInput
