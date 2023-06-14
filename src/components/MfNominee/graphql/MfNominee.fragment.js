/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

'use strict'

import gql from 'graphql-tag'

const MfNomineeFragment = gql`
  fragment MfNominee on MFNomineeNode {
    id
    externalId
    userId
    percentage
  }
`

export default MfNomineeFragment
