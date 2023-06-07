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
import Input from '~/components/Base/Input'

import Family from '../Family'

interface EmailInputPropTypes {
  dispatch: (param: any) => void
  onChangeHandler: (param: any) => void
  onSubmit: (param: any) => void
  state: Record<string, any>
  user: Record<string, any>
}

const EmailInput = ({
  dispatch,
  onChangeHandler,
  onSubmit,
  state,
  user,
}: EmailInputPropTypes) => {
  const rendered = user.families.length
    ? user.emailDeclaration.template
        .replace('{name}', user.name)
        .replace('{relation}', `my ${state.emailRelation}`)
    : user.emailDeclaration.rendered

  return (
    <EmailInputWrapper>
      <Container>
        <Title>Choose Email for investment</Title>
        <InputsContainer>
          <form style={{ marginBottom: '3.3rem' }} onSubmit={onSubmit}>
            {user.families.length ? (
              <Family dispatch={dispatch} user={user} />
            ) : null}
            <Label>Email Id</Label>
            <InputContainer>
              <Input
                inputType="registration"
                isDisabled={state.isEmailVerified}
                isError={false}
                name="email"
                placeholder=""
                value={state.email}
                width="full"
                onChange={onChangeHandler}
              />
              <VerificationStatus status={state.isEmailVerified}>
                {state.isEmailVerified && <Icon name="wl-icon-check-circle" />}
              </VerificationStatus>
            </InputContainer>
            <p>{rendered}</p>
            <PrimaryButton
              disabled={!state.email.length}
              style={{ margin: '3em 0' }}
              onClick={onSubmit}
            >
              Proceed
            </PrimaryButton>
          </form>
        </InputsContainer>
      </Container>
    </EmailInputWrapper>
  )
}

const EmailInputWrapper = styled.div`
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

const InputContainer = styled.div`
  position: relative;
`

const Label = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: #7e7e7e;
`

const InputsContainer = styled.div`
  margin: 3rem 0 0 0;
  width: 60%;
  @media (max-width: 768px) {
    width: 90%;
  }
`

const VerificationStatus = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -3.2em;
  position: absolute;
  right: 1em;
  color: red;
  ${(props) =>
    props.status &&
    css`
      color: #51a905;
    `}
  text-transform: uppercase;
  font-size: 0.8em;
  i {
    margin-right: 0.5em;
    margin-bottom: 4px;
    color: #51a905;
    font-size: 1.25em;
  }
`

export default EmailInput
