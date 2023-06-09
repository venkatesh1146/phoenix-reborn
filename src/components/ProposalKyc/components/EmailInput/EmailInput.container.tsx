/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import React from 'react'

import { handleApiError } from '~/utils/ErrorUtils'
import { showErrorToast } from '~/utils/ToastUtils'
import WealthyValidations from '~/utils/ValidationUtils'

import EmailInput from './EmailInput'

import { REQUEST_USER_PROFILE_UPDATE } from '~/graphql'
import useGqlMutation from '~/hooks/useGqlMutation'

interface EmailInputContainerPropTypes {
  dispatch: Function
  state: Record<string, any>
  user: object
}

const EmailInputContainer = ({
  dispatch,
  state,
  user,
}: EmailInputContainerPropTypes) => {
  const { mutate: requestUserProfileUpdate } = useGqlMutation({
    mutation: REQUEST_USER_PROFILE_UPDATE,
  })
  const onChangeHandler = (event) => {
    const { name, value } = event.target

    dispatch({ type: 'update', name, value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!WealthyValidations.validateFormField['email'](state.email)) {
      showErrorToast('Please check the email entered')
      return
    }
    if (state.isEmailVerified) {
      dispatch({ type: 'update', name: 'stage', value: 3 })
      return
    }

    requestUserProfileUpdate({
      variables: { input: { email: state.email } },
      onSuccess: ({ data }) => {
        dispatch({
          type: 'update',
          name: 'token',
          value: data.requestUserProfileUpdate.token,
        })
        dispatch({ type: 'email-otp' })
      },
      onFailure: handleApiError,
    })
  }

  return (
    <EmailInput
      dispatch={dispatch}
      state={state}
      user={user}
      onChangeHandler={onChangeHandler}
      onSubmit={onSubmit}
    />
  )
}

export default EmailInputContainer
