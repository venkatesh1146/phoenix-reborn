/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

"use strict";

import gql from "graphql-tag";

const UserNomineeFragment = gql`
  fragment UserNominee on UserNomineeNode {
    id
    externalId
    userId
    name
    relationship
    guardianName
    dob
    guardianDob
  }
`;

export default UserNomineeFragment;
