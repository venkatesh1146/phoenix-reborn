/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import React, { useEffect, useState } from 'react'

import { handleApiError } from '~/utils/ErrorUtils'
import { showErrorToast } from '~/utils/ToastUtils'
import WealthyValidations from '~/utils/ValidationUtils'

import MobileInput from './MobileInput'

import { countryCodes } from '~/constants'
import { REQUEST_USER_PROFILE_UPDATE } from '~/graphql'
import useGqlMutation from '~/hooks/useGqlMutation'
import useGqlQuery from '~/hooks/useGqlQuery'

interface MobileInputContainerPropTypes {
  dispatch: Function
  state: Record<string, any>
  user: Record<string, any>
}

const MobileInputContainer = ({
  dispatch,
  state,
  user,
}: MobileInputContainerPropTypes) => {
  const [selectedCountry, setSelectedCountry] = useState<any[]>([])
  const [isCodeEditing, setIsCodeEditing] = useState(false)

  const { mutate: requestUserProfileUpdate } = useGqlMutation({
    mutation: REQUEST_USER_PROFILE_UPDATE,
  })

  useEffect(() => {
    if (user?.exists) {
      getSelectedCountry(state.countryCode)
    }
  }, [user])

  const onChangeHandler = (event: any) => {
    const { name, value } = event.target

    dispatch({ type: 'update', name, value })
  }

  const onSubmit = (event: any) => {
    event.preventDefault()
    if (!WealthyValidations.validateFormField['mobile'](state.phoneNumber)) {
      showErrorToast('Please check the phone number entered')
      return
    }

    if (state.isPhoneVerified) {
      dispatch({ type: 'update', name: 'stage', value: 2 })
      return
    }

    requestUserProfileUpdate({
      variables: {
        input: {
          phoneNumber: `(${state.countryCode})${state.phoneNumber}`,
        },
      },
      onSuccess: ({ data }: any) => {
        dispatch({
          type: 'update',
          name: 'token',
          value: data.requestUserProfileUpdate.token,
        })
        dispatch({ type: 'mobile-otp' })
      },
      onFailure: handleApiError,
    })
  }

  const getSelectedCountry = (countryCode: string) => {
    const countryList: any[] = countryCodes.filter((country: any) => {
      return country.code.replace(/\s/g, '') === countryCode.replace(/\s/g, '')
    })
    if (countryList[0]) {
      setSelectedCountry(countryList)
      setIsCodeEditing(false)
    }
  }

  const handleMobileCode = (event: any) => {
    let countryCode = event.target.value
    if (countryCode && countryCode !== '+') {
      countryCode = `+${
        countryCode.split('+')[1]
          ? countryCode.split('+')[1].replace(/^0+/, '')
          : countryCode.replace(/^0+/, '')
      }`
    }

    dispatch({ type: 'update', name: 'countryCode', value: countryCode })
    setIsCodeEditing(!!countryCode)
    setSelectedCountry([])
    getSelectedCountry(countryCode)
  }

  return (
    <MobileInput
      dispatch={dispatch}
      handleMobileCode={handleMobileCode}
      isCodeEditing={isCodeEditing}
      selectedCountry={selectedCountry}
      state={state}
      user={user}
      onChangeHandler={onChangeHandler}
      onSubmit={onSubmit}
    />
  )
}

export default MobileInputContainer