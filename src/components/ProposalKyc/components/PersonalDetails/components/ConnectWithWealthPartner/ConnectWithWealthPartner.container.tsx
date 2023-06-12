/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import React, { useEffect, useState } from 'react'

import ConnectWithWealthPartner from './ConnectWithWealthPartner'
import PARTNER_QUERY from './graphql/partner.query'

import useGqlQuery from '~/hooks/useGqlQuery'

interface ConnectWithWealthPartnerContainerPropTypes {
  user: Record<string, any>
}

const ConnectWithWealthPartnerContainer = (
  props: ConnectWithWealthPartnerContainerPropTypes
) => {
  const [agent, setAgent] = useState({})
  const { data, fetchData, isLoading, error } = useGqlQuery({
    query: PARTNER_QUERY,
    variables: {
      userId: props.user.userId,
    },
  })

  useEffect(() => {
    if (data?.hydra && data?.hydra.customerPartner) {
      setAgent(data?.hydra.customerPartner)
    }
  }, [data?.hydra, isLoading, error])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ConnectWithWealthPartner agent={agent} error={error} loading={isLoading} />
  )
}

export default ConnectWithWealthPartnerContainer
