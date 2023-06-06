/*
  Author: Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import gql from 'graphql-tag'

const PAN_CHECK_QUERY = gql`
  query PanCheckQuery($pan: String, $dob: String, $name: String) {
    hagrid {
      wealthyPanChecks(pan: $pan, dob: $dob, name: $name) {
        maskedName
        kraVerified
        nameScore
        ckyc
        seeded
        daysRemainingForAadharPanLinking
      }
    }
  }
`

export default PAN_CHECK_QUERY
