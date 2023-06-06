/*
  Author: Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import gql from "graphql-tag";

const PREFILL_QUERY = gql`
  query PrefillQuery ($onBoardProduct: String, $declarationType: String) {
    hagrid {
      wealthyUserDetailsPrefill (onBoardProduct: $onBoardProduct, declarationType: $declarationType) {
        userId
        name
        email
        emailRelation
        phoneNumber
        phoneRelation
        panNumber
        dob
        declarations {
          code
          template
          context
          type
        }
        emailDeclaration {
          code
          template
          context
          rendered
          type
        }
        phoneDeclaration {
          code
          template
          context
          rendered
          type
        }
        families {
          ownerUserRelationship
          userOwnerRelationship
          isExisting
          ownerDetails {
            ownerUserId
            name
            email
            isEmailVerified
            phoneNumber
            isPhoneVerified
            emailDeclaration {
              code
              template
              context
              rendered
              type
            }
            phoneDeclaration {
              code
              template
              context
              rendered
              type
            }
          }
        }
        isEmailVerified
        isPhoneVerified
        firstName
        lastName
        status {
          kyc {
            kycUrl
          }
        }
      }
    }
  }`;

export default PREFILL_QUERY;
