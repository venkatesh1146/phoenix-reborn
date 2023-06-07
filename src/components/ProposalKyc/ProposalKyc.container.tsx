/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { useQuery } from '@apollo/client'
import { UserProfileModel } from 'frontend-models'
import React, { useEffect, useReducer, useState } from 'react'

import { decodeDateFormatWithHyphen } from '~/utils/DateUtils'
import StorageUtils from '~/utils/StorageUtils'
import WealthyValidations from '~/utils/ValidationUtils'
import appEnv from '~/utils/env'

import ProposalKyc from './ProposalKyc'
import PREFILL_QUERY from './graphql/prefill.query'

import useGqlQuery from '~/hooks/useGqlQuery'

interface ProposalKycContainerPropTypes {
  error: boolean
  hagrid: Record<string, any>
  loading: boolean
}

const ProposalKycContainer = () => {
  const [user, setUser] = useState(UserProfileModel.init({}))
  const { data, isLoading, fetchData } = useGqlQuery({
    query: PREFILL_QUERY,
  })

  const initialState = {
    render: false,
    token: '',
    stage: 1,
    navigatingBack: true,
    dob: new Date(),
    email: '',
    isNri: false,
    name: '',
    panNumber: '',
    panError: '',
    phoneNumber: '',
    countryCode: '+91',
    emailOwnerUserId: '',
    emailRelation: '',
    phoneOwnerUserId: '',
    phoneRelation: '',
    panUsageType: '',
    isPhoneVerified: false,
    isEmailVerified: false,
    onBoardingProfiles: [],
  }

  const [state, dispatch] = useReducer(
    (state: any, { type, name, value }: any) => {
      state = { ...state, navigatingBack: false }
      switch (type) {
        case 'update':
          if (name === 'panNumber') {
            if (!WealthyValidations.validateFormField.pan(value)) {
              state = {
                ...state,
                panError: 'Please check the pan entered',
              }
            } else {
              state = {
                ...state,
                panError: '',
              }
            }
          }
          return (state = { ...state, [name]: value })
        case 'batch-update':
          return (state = { ...state, ...value })
        case 'back':
          return (state = {
            ...state,
            stage: state.stage > 1 ? state.stage - 1 : state.stage,
            navigatingBack: true,
          })
        case 'mobile-otp':
          return (state = { ...state, stage: 8 })
        case 'email-otp':
          return (state = { ...state, stage: 9 })
        default:
          return state
      }
    },
    initialState
  )

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data?.hagrid) {
      const userData = UserProfileModel.init(
        data?.hagrid.wealthyUserDetailsPrefill
      )
      setUser(userData)

      if (emptyChecker(userData.kycUrl)) {
        const domain = appEnv.IS_LOCAL
          ? 'http://localhost:9000'
          : appEnv.API_URL
        window.location.assign(
          `${
            userData.kycUrl
          }&redirect_to=${domain}${StorageUtils.getSessionStorageKey(
            'kycDestination'
          )}`
        )
        return
      }

      const {
        dob,
        email,
        name,
        phoneNumber,
        panNumber,
        emailRelation,
        phoneRelation,
        families,
        userId,
        isEmailVerified,
        isPhoneVerified,
      } = userData

      let emailOwnerUserId, phoneOwnerUserId

      if (families.length) {
        emailOwnerUserId = families[0].ownerDetails.ownerUserId
        phoneOwnerUserId = families[0].ownerDetails.ownerUserId
      }

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
        token: '',
        dob: dob.exists() ? decodeDateFormatWithHyphen(dob) : '',
        email: emptyChecker(email),
        name: emptyChecker(name),
        panNumber: emptyChecker(panNumber),
        phoneNumber: mobile,
        countryCode,
        isEmailVerified,
        isPhoneVerified,
        emailOwnerUserId: emptyChecker(emailOwnerUserId) || userId,
        emailRelation: emptyChecker(emailRelation) || 'self',
        phoneOwnerUserId: emptyChecker(phoneOwnerUserId) || userId,
        phoneRelation: emptyChecker(phoneRelation) || 'self',
        panUsageType: 'INDIVIDUAL',
        onBoardingProfiles: ['MF'],
        panUsageSubtype: 'NON_NRI',
        render: true,
      }

      dispatch({ type: 'batch-update', value })
    }
  }, [data])

  useEffect(() => {
    //pass
  }, [state.phoneRelation, state.emailRelation])

  const emptyChecker = (value: string) => {
    return value && value !== '-' ? value : ''
  }

  return (
    <ProposalKyc
      dispatch={dispatch}
      error={data?.error}
      loading={isLoading}
      state={state}
      user={user}
    />
  )
}

const WithData = (props) => {
  const { data } = useQuery(PREFILL_QUERY, {
    variables: {
      onBoardProduct: 'MF',
      declarationType: 'basic',
    },
  })

  return props.renderChildren(data)
}

export default ProposalKycContainer
