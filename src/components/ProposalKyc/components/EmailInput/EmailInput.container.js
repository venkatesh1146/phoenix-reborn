/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { WealthyUtils, WealthyValidations } from 'helpers'
import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'react-apollo'

import EmailInput from './EmailInput'

import { REQUEST_USER_PROFILE_UPDATE } from '~/graphql'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  requestUserProfileUpdate: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

const EmailInputContainer = ({
  dispatch,
  requestUserProfileUpdate,
  state,
  user,
}) => {
  const onChangeHandler = (event) => {
    const { name, value } = event.target

    dispatch({ type: 'update', name, value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!WealthyValidations.validateFormField['email'](state.email)) {
      WealthyUtils.showToast('Please check the email entered')
      return
    }
    if (state.isEmailVerified) {
      dispatch({ type: 'update', name: 'stage', value: 3 })
      return
    }

    requestUserProfileUpdate({ email: state.email })
      .then(({ data }) => {
        dispatch({
          type: 'update',
          name: 'token',
          value: data.requestUserProfileUpdate.token,
        })
        dispatch({ type: 'email-otp' })
      })
      .catch(WealthyUtils.handleApiError)
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

const withMutation = graphql(REQUEST_USER_PROFILE_UPDATE, {
  props: ({ mutate }) => ({
    requestUserProfileUpdate: (payload) =>
      mutate({
        variables: {
          input: payload,
        },
      }),
  }),
})

EmailInputContainer.propTypes = propTypes

export default withMutation(EmailInputContainer)
