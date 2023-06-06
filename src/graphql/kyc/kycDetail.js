import gql from 'graphql-tag'

import KYC_DETAIL_FRAGMENT from './KycDetailFragment'

const KYC_DETAIL_QUERY = gql`
  query KycDetailQuery {
    kycDetails {
      ...KycFragmentKycDetailNode
    }
  }
  ${KYC_DETAIL_FRAGMENT}
`

export default KYC_DETAIL_QUERY
