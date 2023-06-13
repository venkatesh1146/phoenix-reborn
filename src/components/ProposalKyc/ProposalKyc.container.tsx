/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { styled } from '@linaria/react'
import { UserProfileModel } from 'frontend-models'
import React, { useEffect, useReducer, useState } from 'react'

import { tm } from '~/styles/theme'
import { decodeDateFormatWithHyphen } from '~/utils/DateUtils'
import StorageUtils from '~/utils/StorageUtils'
import WealthyValidations from '~/utils/ValidationUtils'
import appEnv from '~/utils/env'

import { DesktopRightSection } from '../CommonStyledComponents'
import DesktopLeftSection from '../DesktopLeftSection'

import ProposalKyc from './ProposalKyc'
import PREFILL_QUERY from './graphql/prefill.query'
import { Title } from './styledComponents'

import useGqlQuery from '~/hooks/useGqlQuery'

const ProposalKycContainer = () => {
  const [user, setUser] = useState(UserProfileModel.init({}))
  const { data, isLoading, fetchData } = useGqlQuery({
    query: PREFILL_QUERY,
    variables: {
      onBoardProduct: 'MF',
      declarationType: 'basic',
    },
    showErrorToast: true,
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
    if (data?.data?.hagrid?.wealthyUserDetailsPrefill) {
      const userData = UserProfileModel.init(
        data?.data?.hagrid?.wealthyUserDetailsPrefill
      )
      setUser(userData)

      if (emptyChecker(userData.kycUrl)) {
        const domain = appEnv.IS_LOCAL
          ? 'http://localhost:3000'
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

  const renderInstructions = () => {
    switch (state.stage) {
      case 1:
        return <Title>Choose phone number for investment</Title>
      case 2:
        return <Title>Choose email for investment</Title>
      case 3:
        return <Title>Personal Details</Title>
      case 8:
      case 9:
        return <Title>OTP Verification</Title>
      default:
        return <></>
    }
  }

  return (
    <Wrapper>
      <DesktopLeftSection>{renderInstructions()}</DesktopLeftSection>
      <DesktopRightSection className="right-section">
        <ProposalKyc
          dispatch={dispatch}
          error={data?.error}
          loading={isLoading}
          state={state}
          user={user}
        />
      </DesktopRightSection>
    </Wrapper>
  )
}

export default ProposalKycContainer

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  .right-section {
    padding: 0;
  }
  @media screen and (max-width: 1023px) {
    flex-direction: column;
    .mf-desktop-left-section-wrapper {
      max-width: unset;
      width: 100%;
      padding: 1.5rem;
      height: max-content;
      margin-left: unset !important;
      margin-right: unset !important;
    }
    .right-section {
      margin: unset;
      padding: 0 !important;
      display: flex;
    }
  }
  form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .transition-wrapper {
    height: 100%;
    @media screen and (min-width: 1024px) {
      padding-top: 5rem !important;
    }
  }

  .section-title {
    @media screen and (min-width: 1024px) {
      font-family: 'Marcellus';
      font-style: normal;
      font-weight: 400;
      font-size: 1.25rem !important;
      line-height: 24px;
      text-align: left;

      color: ${tm((t) => t.colors.primaryTextColor)};
    }
    text-align: left;
  }
`
