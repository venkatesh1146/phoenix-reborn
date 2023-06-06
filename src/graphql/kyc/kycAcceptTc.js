import gql from 'graphql-tag'

const KYC_ACCEPT_TERMS_AND_CONDITIONS = gql`
  mutation AcceptTermsAndCondtions($input: AgreeKycTcInput!) {
    agreeKycTc(input: $input) {
      tcAgreedAt
    }
  }
`

export default KYC_ACCEPT_TERMS_AND_CONDITIONS
