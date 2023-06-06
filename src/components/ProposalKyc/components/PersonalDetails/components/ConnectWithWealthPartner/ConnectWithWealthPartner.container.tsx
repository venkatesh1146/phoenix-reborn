/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { graphql } from 'react-apollo'

import ConnectWithWealthPartner from './ConnectWithWealthPartner'
import PARTNER_QUERY from './graphql/partner.query'

const propTypes = {
  error: PropTypes.bool.isRequired,
  hydra: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

const ConnectWithWealthPartnerContainer = ({ hydra, loading, error }: any) => {
  const [agent, setAgent] = useState({})

  useEffect(() => {
    if (hydra && hydra.customerPartner) {
      setAgent(hydra.customerPartner)
    }
  }, [hydra, loading, error])

  return (
    <ConnectWithWealthPartner agent={agent} error={error} loading={loading} />
  )
}

const withData = graphql(PARTNER_QUERY, {
  props: ({ data: { hydra, loading, error } }: any) => ({
    hydra,
    loading,
    error,
  }),
  options: (props: any) => ({
    variables: {
      userId: props?.user.userId,
    },
  }),
})

ConnectWithWealthPartnerContainer.propTypes = propTypes

export default withData(ConnectWithWealthPartnerContainer)
