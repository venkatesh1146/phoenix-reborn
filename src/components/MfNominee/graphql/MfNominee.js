/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

"use strict";

import gql from "graphql-tag";

import MfNomineeFragment from "./MfNominee.fragment";
import UserNomineeFragment from "./UserNominee.fragment";

const CREATE_MF_NOMINEE = gql`
  mutation addMfNominee ($input: [MFNomineeInput]!) {
    createMfNominees(input: $input) {
      mfNominees {
        ...MfNominee
        nominee {
          ...UserNominee
        }
      }
    }
  }
  ${MfNomineeFragment}
  ${UserNomineeFragment}
`;

const UPDATE_MF_NOMINEE = gql`
  mutation updateMfNominee ($input: UpdateMfNomineeInput!) {
    updateMfNominee(input: $input) {
      mfNominee {
        ...MfNominee
        nominee {
          ...UserNominee
        }
      }
    }
  }
  ${MfNomineeFragment}
  ${UserNomineeFragment}
`;

export {
  CREATE_MF_NOMINEE,
  UPDATE_MF_NOMINEE
};
