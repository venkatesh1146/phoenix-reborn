import gql from 'graphql-tag'

const CREATE_KYC_MUTATION = gql`
  mutation createKyc($input: CreateKycInput!) {
    createKyc(input: $input) {
      kyc {
        id
        status
        tc {
          id
          tcHtml
          tcText
        }
      }
    }
  }
`

export default CREATE_KYC_MUTATION
