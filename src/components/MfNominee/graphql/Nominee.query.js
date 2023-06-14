/*
  Author: Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import gql from "graphql-tag";

import UserNomineeFragment from "./UserNominee.fragment";
import MfNomineeFragment from "./MfNominee.fragment";

const USER_NOMINEE_QUERY = gql`
  query UserNomineeQuery {
    hagrid {
      userNominees {
        ...UserNominee
      }
    }
  }
  ${UserNomineeFragment}
`;

const MF_NOMINEE_QUERY = gql`
  query MfNomineeQuery {
    hagrid {
      mfNominees {
        ...MfNominee
        nominee {
          ...UserNominee
        }
      }
    }
  }
  ${UserNomineeFragment}
  ${MfNomineeFragment}
`;

export {
  USER_NOMINEE_QUERY,
  MF_NOMINEE_QUERY
};
