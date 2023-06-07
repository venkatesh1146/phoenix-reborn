/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import gql from 'graphql-tag'

const VERIFY_USER_PROFILE_UPDATE = gql`
  mutation VerifyUserProfileUpdate(
    $input: VerifyUpdateUserProfileRequestInput!
  ) {
    verifyUserProfileUpdate(input: $input) {
      message
    }
  }
`

export default VERIFY_USER_PROFILE_UPDATE
