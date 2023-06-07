import gql from 'graphql-tag'

const KYC_DETAIL_FRAGMENT = gql`
  fragment KycFragmentKycDetailNode on KycDetailNode {
    id
    status
    motherName
  }
`

export default KYC_DETAIL_FRAGMENT
