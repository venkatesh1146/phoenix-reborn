/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { Container, RadioButton } from 'components'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

const propTypes = {
  isMobile: PropTypes.bool,
  onOptionChange: PropTypes.func.isRequired,
  selectedUser: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

const Family = ({ isMobile, onOptionChange, selectedUser, user }) => {
  const content = []
  user.families.forEach((familyMember) => {
    const ownerDetails = familyMember.ownerDetails
    const isVerified = isMobile
      ? ownerDetails.isPhoneVerified
      : ownerDetails.isEmailVerified
    content.push(
      <EachRadioForm
        isActive={
          ownerDetails.ownerUserId === selectedUser.ownerDetails.ownerUserId
        }
        key={ownerDetails.ownerUserId}
        onClick={() => onOptionChange(familyMember)}
      >
        <RadioButton
          isActive={
            ownerDetails.ownerUserId === selectedUser.ownerDetails.ownerUserId
          }
        />
        {ownerDetails.name} -{' '}
        {isMobile
          ? ownerDetails.phoneNumber.toString()
            ? ownerDetails.phoneNumber
            : 'Add new number'
          : ownerDetails.email.toString()
          ? ownerDetails.email
          : 'Add new email'}{' '}
        {isVerified ? '(Verified)' : null}
      </EachRadioForm>
    )
  })

  return (
    <React.Fragment>
      <FamilyHeader>
        This {isMobile ? 'number' : 'email'} will be used for your future
        investments
      </FamilyHeader>
      <p>(If not verified, you will be asked an OTP for verification)</p>
      <FamilyContainer>{content}</FamilyContainer>
    </React.Fragment>
  )
}

Family.propTypes = propTypes

const EachRadioForm = styled.div`
  display: flex;
  overflow: auto;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  background-color: #e3e7f1;
  padding: 1em;
  box-sizing: border-box;
  border-radius: 5px;
  border: 0.5px solid var(--cobalt);
  text-align: start;
  div {
    margin-bottom: 0.2em;
    border: 0.5px solid var(--cobalt);
  }
  ${(props) =>
    props.isActive &&
    css`
      color: var(--cobalt);
      font-weight: 600;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
      background-color: white;
    `}
`

const FamilyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  grid-gap: 1em;
  margin-bottom: 4rem;
  font-size: 0.85rem;
`

const FamilyHeader = Container.extend`
  font-size: 1.5rem;
  font-weight: 500;
  justify-content: center;
  color: var(--lighter-gray);
  margin-bottom: 1.5em;
  margin-top: 2em;
  width: 100%;
`

export default Family
