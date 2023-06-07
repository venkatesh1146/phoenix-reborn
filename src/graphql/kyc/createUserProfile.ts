/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import gql from 'graphql-tag'

const CREATE_USER_PROFILE = gql`
  mutation createUserProfile($input: CreateProfileArgsInput!) {
    createUserProfile(input: $input) {
      userProfile {
        name
        userId
        kycUrl
      }
    }
  }
`

export default CREATE_USER_PROFILE
