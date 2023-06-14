/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { styled } from '@linaria/react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { handleApiError } from '~/utils/ErrorUtils'

import Text from '../Base/Text'
import { DesktopRightSection } from '../CommonStyledComponents'
import DesktopLeftSection from '../DesktopLeftSection'

import MfNominee from './MfNominee'
import { CREATE_MF_NOMINEE } from './graphql/MfNominee'
import { MF_NOMINEE_QUERY, USER_NOMINEE_QUERY } from './graphql/Nominee.query'
import { CREATE_USER_NOMINEE } from './graphql/UserNominee'

import useGqlMutation from '~/hooks/useGqlMutation'
import useGqlQuery from '~/hooks/useGqlQuery'

const propTypes = {
  createMfNominee: PropTypes.func.isRequired,
  createUserNominee: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  mfNominees: PropTypes.array.isRequired,
  userNominees: PropTypes.array.isRequired,
}

const MfNomineeContainer = ({ history }) => {
  const [mfNomineeList, setMfNomineeList] = useState<any[]>([])
  const [userNomineeList, setUserNomineeList] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  const {
    fetchData: getUserNominees,
    isLoading: isGetUserNomineesLoading,
    error: getUserNomineesError,
    data: userNomineesData,
  } = useGqlQuery({
    query: USER_NOMINEE_QUERY,
  })
  const userNominees = userNomineesData?.data?.hagrid?.userNominees || null

  const {
    fetchData: getMFNominees,
    isLoading: isGetMFNomineesLoading,
    error: getMFNomineesError,
    data: mfNomineesResponse,
  } = useGqlQuery({
    query: MF_NOMINEE_QUERY,
  })

  const mfNominees = mfNomineesResponse?.data?.hagrid?.mfNominees || null

  const { mutate: createMfNominee, isLoading } = useGqlMutation({
    mutation: CREATE_MF_NOMINEE,
  })

  const { mutate: createUserNominee } = useGqlMutation({
    mutation: CREATE_USER_NOMINEE,
  })

  const loading = isGetUserNomineesLoading || isGetMFNomineesLoading
  const error = getUserNomineesError || getMFNomineesError

  const proposalId = router.query.from_proposal

  useEffect(() => {
    getUserNominees()
    getMFNominees()
  }, [])

  useEffect(() => {
    if (mfNominees && !isLoading) {
      const mfNomineesWithPercentage = mfNominees.map((nominee) => ({
        ...nominee.nominee,
        percentage: nominee.percentage,
      }))
      setMfNomineeList(mfNomineesWithPercentage)
    }
  }, [mfNominees])

  useEffect(() => {
    if (userNominees && !isLoading) {
      setUserNomineeList(userNominees)
    }
  }, [userNominees])

  const onSubmit = (event) => {
    event.preventDefault()
    let totalPercent = 0
    const mfNomineeListCopy = mfNomineeList.map((nominee: any) => {
      if (!nominee.percentage) return
      totalPercent += nominee.percentage
      return {
        nomineeId: nominee.externalId,
        percentage: nominee.percentage,
      }
    })

    if (totalPercent !== 100) {
      toast.error('Total Percentage allocation to nominees must be 100%')
      return
    }

    createMfNominee({
      variables: { input: mfNomineeListCopy.filter(Boolean) },
      onSuccess: () => {
        toast.success('MF Nominees set successfully')
        if (proposalId) {
          history.push(`/proposals/${proposalId}`)
        }
      },
      onFailure: handleApiError,
    })
  }

  const onAdd = () => {
    const mfNomineeListCopy: any = [...mfNomineeList]
    mfNomineeListCopy.push({})
    setMfNomineeList(mfNomineeListCopy)
  }

  const onDelete = (index) => {
    const mfNomineeListCopy = [...mfNomineeList]
    mfNomineeListCopy.splice(index, 1)
    setMfNomineeList(mfNomineeListCopy)
  }

  const onSelectNominee = (value, option, index) => {
    if (option.props.optKey === 'add new') {
      setShowForm(true)
      return
    }

    const mfNomineeListCopy: any = [...mfNomineeList]
    const isDuplicate =
      mfNomineeListCopy.filter(
        (nominee) => nominee.name === option.props.optKey.name
      ).length !== 0

    if (isDuplicate) {
      toast.error('This nominee has already been added.')
      return
    }
    mfNomineeListCopy[index] = option.props.optKey
    setMfNomineeList(mfNomineeListCopy)
  }

  return (
    <Wrapper>
      <DesktopLeftSection>
        <Text style={{ marginTop: '2rem' }}>
          Update your MF Profile nominees
        </Text>
      </DesktopLeftSection>
      <DesktopRightSection className="right-section">
        <MfNominee
          createUserNominee={createUserNominee}
          error={error}
          isLoading={isLoading}
          loading={loading}
          mfNomineeList={mfNomineeList}
          setMfNomineeList={setMfNomineeList}
          setShowForm={setShowForm}
          showForm={showForm}
          userNomineeList={userNomineeList}
          onAdd={onAdd}
          onDelete={onDelete}
          onSelectNominee={onSelectNominee}
          onSubmit={onSubmit}
        />
      </DesktopRightSection>
    </Wrapper>
  )
}

MfNomineeContainer.propTypes = propTypes

export default MfNomineeContainer
const Wrapper = styled.div`
  display: flex;
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
`
