import gql from 'graphql-tag'

const KYC_TC_QUERY = gql`
  query KycTcs {
    kycTcs {
      id
    }
    accounts {
      id
    }
  }
`

export default KYC_TC_QUERY
