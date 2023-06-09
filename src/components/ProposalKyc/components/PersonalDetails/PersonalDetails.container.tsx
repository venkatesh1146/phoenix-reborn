/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { useApolloClient } from '@apollo/client'
import { PanUsageSubtype, WealthyDate } from 'frontend-models'
import React, { useState } from 'react'
// import { graphql, withApollo } from 'react-apollo'

import { getErrorMessage, handleApiError } from '~/utils/ErrorUtils'
import WealthyStorage from '~/utils/StorageUtils'
import WealthyEnv from '~/utils/env'

import PersonalDetails from './PersonalDetails'
import PAN_CHECK_QUERY from './graphql/PanCheck.query'

import { CREATE_USER_PROFILE } from '~/graphql'
import useGqlMutation from '~/hooks/useGqlMutation'

const checkField = [
  {
    name: 'I am a citizen & resident of India',
  },
  {
    name: 'I am not a politically exposed person',
  },
  {
    name: "I don't have tax obligations outside India",
  },
]

interface PersonalDetailsContainerPropTypes {
  client: Record<string, any>
  createUserProfile: (param: any) => Promise<any>
  dispatch: (param: any) => void
  state: Record<string, any>
  user: Record<string, any>
}

const PersonalDetailsContainer = ({
  dispatch,
  state,
  user,
}: PersonalDetailsContainerPropTypes) => {
  const [checkedState, setCheckedState] = useState(
    new Array(checkField.length).fill(true)
  )
  const { mutate: createUserProfile, isLoading: loading } = useGqlMutation({
    mutation: CREATE_USER_PROFILE,
  })

  const client = useApolloClient()
  const [checkingPan, setCheckingPan] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const isNotCheckedIndex = checkedState.findIndex((item) => item === false)
  const isChecked = isNotCheckedIndex === -1

  const handleOnCheckboxChange = (position: any) => {
    const updatedCheckedState = checkedState.map((checked, index) =>
      index === position ? !checked : checked
    )
    setCheckedState(updatedCheckedState)
  }

  const onChangeHandler = (event: any) => {
    const { name, value } = event.target

    dispatch({ type: 'update', name, value })
  }

  const onProceed = (event: any) => {
    event.preventDefault()
    setCheckingPan(true)
    client
      .query({
        query: PAN_CHECK_QUERY,
        variables: {
          pan: state.panNumber.toUpperCase(),
          dob: WealthyDate.init(state.dob).dayMonthYearFormatInSequence(),
          name: '',
        },
        fetchPolicy: 'network-only',
      })
      .then(({ data }: any) => {
        const panInfo = data.hagrid.wealthyPanChecks
        let error = ''
        if (!panInfo.seeded) {
          error = `The deadline to link your PAN and Aadhaar is approaching. Please ensure that you complete this process within the next ${panInfo.daysRemainingForAadharPanLinking} days.`
        }
        setErrorMsg(error)
        setName(panInfo.maskedName)
        setShowModal(true)
      })
      .catch((error: any) => {
        handleApiError(error)
        // setErrorMsg(error.message);
      })
      .finally(() => {
        setCheckingPan(false)
      })
  }

  const onSubmit = (event: any) => {
    event.preventDefault()
    const isAgreed = true
    const declarations = ['PHONE', 'EMAIL'].map((item) => ({
      isAgreed,
      code: item,
    }))

    declarations.push({ isAgreed: checkedState[0], code: 'INDIAN_RESIDENT' })
    declarations.push({ isAgreed: checkedState[1], code: 'NO_POLITICS' })
    declarations.push({ isAgreed: checkedState[2], code: 'INDIAN_INCOME' })

    const payload = {
      dob: state.dob,
      email: state.email,
      name: state.name,
      panNumber: state.panNumber.toUpperCase(),
      phoneNumber: `(${state.countryCode})${state.phoneNumber}`,
      emailOwnerUserId: state.emailOwnerUserId,
      emailRelation: state.emailRelation,
      phoneOwnerUserId: state.phoneOwnerUserId,
      phoneRelation: state.phoneRelation,
      panUsageType: state.panUsageType,
      panUsageSubtype: checkedState[0]
        ? PanUsageSubtype.NON_NRI
        : PanUsageSubtype.NRI,
      onBoardingProfiles: state.onBoardingProfiles,
      declarations,
    }

    let goNextPage = false

    createUserProfile({
      variables: { input: { payload } },
      onSuccess: ({ data }: any) => {
        if (!isChecked) {
          // if (isNotCheckedIndex !== 0) {
          dispatch({ type: 'update', name: 'stage', value: 4 })
          return
          // }
        }
        const kycUrl = data.createUserProfile.userProfile.kycUrl
        let kycDestination =
          WealthyStorage.getSessionStorageKey('kycDestination')
        const domain = WealthyEnv.IS_LOCAL
          ? 'http://localhost:9000'
          : WealthyEnv.API_URL
        if (!kycDestination) {
          kycDestination = `${domain}/dashboard/investments`
        }
        window.location.assign(
          kycUrl
            ? `${kycUrl}&redirect_to=${domain}${kycDestination}`
            : kycDestination
        )

        setShowModal(false)
      },
      onFailure: (error) => {
        const errorText = getErrorMessage(error)
        goNextPage = errorText.toLowerCase().includes('valid flows')

        setShowModal(false)
        goNextPage && dispatch({ type: 'update', name: 'stage', value: 4 })
      },
    })
  }

  return (
    <PersonalDetails
      checkedState={checkedState}
      checkField={checkField}
      checkingPan={checkingPan}
      errorMsg={errorMsg}
      handleOnCheckboxChange={handleOnCheckboxChange}
      loading={loading}
      name={name}
      setShowModal={setShowModal}
      showModal={showModal}
      state={state}
      onChangeHandler={onChangeHandler}
      onProceed={onProceed}
      onSubmit={onSubmit}
    />
  )
}

export default PersonalDetailsContainer
