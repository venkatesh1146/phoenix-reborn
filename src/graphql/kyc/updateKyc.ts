import gql from 'graphql-tag'

import KYC_DETAIL_FRAGMENT from './KycDetailFragment'

const KYC_UPDATE_MUTATION = gql`
  mutation kycUpdateMutation($input: UpdateKycInput!) {
    updateKyc(input: $input) {
      kyc {
        ...KycFragmentKycDetailNode
      }
    }
  }
  ${KYC_DETAIL_FRAGMENT}
`

export default KYC_UPDATE_MUTATION
