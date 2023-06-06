import gql from 'graphql-tag'

const UPLOAD_KYC_VIDEO = gql`
  mutation uploadKycVideo($input: UploadKycVideoInput!) {
    uploadKycVideo(input: $input) {
      kyc {
        id
      }
    }
  }
`

export default UPLOAD_KYC_VIDEO
