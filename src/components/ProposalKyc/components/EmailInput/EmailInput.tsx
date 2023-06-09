/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { styled } from '@linaria/react'
import React from 'react'

import { PrimaryButton } from '~/components/Base/Buttons'
import Icon from '~/components/Base/Icon'
import Input from '~/components/Base/Input'
import Text from '~/components/Base/Text'

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
      <form onSubmit={onSubmit}>
        {user.families.length ? (
          <Family dispatch={dispatch} user={user} />
        ) : null}
        <Label className="section-title">Email Id</Label>
        <Input
          inputType="registration"
          isDisabled={state.isEmailVerified}
          isError={false}
          name="email"
          placeholder=""
          width="small"
          value={state.email}
          onChange={onChangeHandler}
          showVerifiedBadge={state.isEmailVerified}
          containerStyles={{ width: 'max-content' }}
        />
        <Text style={{ textAlign: 'left' }}>{rendered}</Text>
        <PrimaryButton
          disabled={!state.email.length}
          style={{ marginTop: 'auto' }}
          onClick={onSubmit}
        >
          Proceed
        </PrimaryButton>
      </form>
    </EmailInputWrapper>
  )
}

const EmailInputWrapper = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Label = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: #7e7e7e;
`

export default EmailInput
