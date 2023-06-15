/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import gql from 'graphql-tag'

import UserNomineeFragment from './UserNominee.fragment'

const CREATE_USER_NOMINEE = gql`
  mutation addUserNominee($input: UserNomineeInput!) {
    createUserNominee(input: $input) {
      nominee {
        ...UserNominee
      }
    }
  }
  ${UserNomineeFragment}
`

const UPDATE_USER_NOMINEE = gql`
  mutation updateUserNominee($input: UpdateUserNomineeInput!) {
    updateUserNominee(input: $input) {
      nominee {
        ...UserNominee
      }
    }
  }
  ${UserNomineeFragment}
`

export { CREATE_USER_NOMINEE, UPDATE_USER_NOMINEE }
