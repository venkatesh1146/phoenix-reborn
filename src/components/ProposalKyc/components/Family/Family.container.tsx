/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import React, { useState } from 'react'

import Family from './Family'

interface FamilyContainerPropTypes {
  dispatch: Function
  isMobile?: boolean
  user: Record<string, any>
}

const defaultProps = {
  isMobile: false,
}

const FamilyContainer = ({
  dispatch,
  isMobile,
  user,
}: FamilyContainerPropTypes) => {
  const [selectedUser, setSelectedUser] = useState(user.families[0])

  const emptyChecker = (value: string) => {
    return value && value !== '-' ? value : ''
  }

  const onOptionChange = (selectedOption: {
    ownerDetails: {
      phoneNumber: any
      ownerUserId: any
      isPhoneVerified: any
      email: any
      isEmailVerified: any
    }
    userOwnerRelationship: any
  }) => {
    setSelectedUser(selectedOption)
    if (isMobile) {
      const phoneNumber = selectedOption.ownerDetails.phoneNumber
      const mobile = emptyChecker(phoneNumber)
        ? phoneNumber.split(')')[1] || phoneNumber
        : ''
      const countryCode =
        emptyChecker(phoneNumber) &&
        phoneNumber.split('(')[1] &&
        phoneNumber.split('(')[1].split(')')[0]
          ? phoneNumber.split('(')[1].split(')')[0]
          : '+91'
      const value = {
        phoneNumber: mobile,
        countryCode,
        phoneRelation: selectedOption.userOwnerRelationship,
        phoneOwnerUserId: selectedOption.ownerDetails.ownerUserId,
        isPhoneVerified: selectedOption.ownerDetails.isPhoneVerified,
      }
      dispatch({ type: 'batch-update', value })
      return
    }

    const value = {
      email: selectedOption.ownerDetails.email,
      emailRelation: selectedOption.userOwnerRelationship,
      emailOwnerUserId: selectedOption.ownerDetails.ownerUserId,
      isEmailVerified: selectedOption.ownerDetails.isEmailVerified,
    }

    dispatch({ type: 'batch-update', value })
  }

  return (
    <Family
      isMobile={isMobile}
      selectedUser={selectedUser}
      user={user}
      onOptionChange={onOptionChange}
    />
  )
}

FamilyContainer.defaultProps = defaultProps

export default FamilyContainer
