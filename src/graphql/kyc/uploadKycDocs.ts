import gql from 'graphql-tag'

const KYC_UPLOAD_DOCS = gql`
  mutation kycUploadDocs($input: UploadKycDocInput!) {
    uploadKycDoc(input: $input) {
      kyc {
        id
      }
    }
  }
`

export default KYC_UPLOAD_DOCS
