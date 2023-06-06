/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import gql from 'graphql-tag'

const REQUEST_USER_PROFILE_UPDATE = gql`
  mutation RequestUserProfileUpdate($input: UpdateUserProfileInput!) {
    requestUserProfileUpdate(input: $input) {
      questionType
      token
      questionText
      answer
      otp
    }
  }
`

export default REQUEST_USER_PROFILE_UPDATE
