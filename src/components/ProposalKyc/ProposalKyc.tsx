/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { styled } from '@linaria/react'
import React from 'react'

import TransitionContainer from '../Base/TransitionContainer'
import ErrorPage from '../ErrorPage'
import OnboardingBack from '../common/OnboardingBack'
import Spinner from '../common/Spinner'

import EmailInput from './components/EmailInput'
import MobileInput from './components/MobileInput'
import Otp from './components/Otp'
import PersonalDetails from './components/PersonalDetails'
import ConnectWithWealthPartner from './components/PersonalDetails/components/ConnectWithWealthPartner'

interface ProposalKycPropTypes {
  dispatch: Function
  error: boolean
  loading: boolean
  state: Record<string, any>
  user: Record<string, any>
}

const ProposalKyc = ({
  dispatch,
  error,
  loading,
  state,
  user,
}: ProposalKycPropTypes) => {
  if (error) {
    return (
      <ErrorPage customError={''} redirectTo={`${window.location.pathname}`} />
    )
  }

  if (loading || !state.render) {
    return (
      <ProposalLoader>
        <Spinner />
      </ProposalLoader>
    )
  }

  const customStyles = {
    flexGrow: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: '2rem',
  }

  return (
    <React.Fragment>
      {![1, 8, 9].includes(state.stage) && (
        <OnboardingBack goBackFunction={() => dispatch({ type: 'back' })} />
      )}

      <TransitionContainer
        customStyles={customStyles}
        reverseTransition={state.navigatingBack}
        visible={state.stage === 1}
      >
        <MobileInput dispatch={dispatch} state={state} user={user} />
      </TransitionContainer>
      <TransitionContainer
        customStyles={customStyles}
        reverseTransition={state.navigatingBack}
        visible={state.stage === 2}
      >
        <EmailInput dispatch={dispatch} state={state} user={user} />
      </TransitionContainer>
      <TransitionContainer
        customStyles={customStyles}
        reverseTransition={state.navigatingBack}
        visible={state.stage === 3}
      >
        <PersonalDetails dispatch={dispatch} state={state} user={user} />
      </TransitionContainer>
      <TransitionContainer
        customStyles={customStyles}
        reverseTransition={state.navigatingBack}
        visible={state.stage === 4}
      >
        <ConnectWithWealthPartner user={user} />
      </TransitionContainer>
      <TransitionContainer
        customStyles={customStyles}
        reverseTransition={state.navigatingBack}
        visible={state.stage === 8}
      >
        <Otp dispatch={dispatch} state={state} user={user} />
      </TransitionContainer>
      <TransitionContainer
        customStyles={customStyles}
        reverseTransition={state.navigatingBack}
        visible={state.stage === 9}
      >
        <Otp dispatch={dispatch} state={state} user={user} />
      </TransitionContainer>
    </React.Fragment>
  )
}

const ProposalLoader = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default ProposalKyc
