import gql from 'graphql-tag'

const KYC_TERMS_AND_CONDITIONS_QUERY = gql`
  query TermsAndConditions {
    kycTcs {
      id
      tcHtml
    }
  }
`

export default KYC_TERMS_AND_CONDITIONS_QUERY
