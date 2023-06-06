/*
  Author: Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import gql from 'graphql-tag'

const PARTNER_QUERY = gql`
  query PartnerQuery($userId: String) {
    hydra {
      customerPartner(userId: $userId) {
        externalId
        name
        email
        info
        phoneNumber
        imageUrl
      }
    }
  }
`

export default PARTNER_QUERY
