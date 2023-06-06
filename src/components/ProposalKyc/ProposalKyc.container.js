/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

"use strict";

import React, {
  useState,
  useEffect,
  useReducer
} from "react";
import PropTypes from "prop-types";
import {graphql} from "react-apollo";

import {UserProfileModel} from "frontend-models";
import {
  WealthyEnv,
  WealthyUtils,
  WealthyValidations
} from "helpers";
import ProposalKyc from "./ProposalKyc";
import PREFILL_QUERY from "./graphql/prefill.query";

const propTypes = {
  error: PropTypes.bool.isRequired,
  hagrid: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const ProposalKycContainer = ({
  hagrid,
  loading,
  error
}) => {
  const [user, setUser] = useState(UserProfileModel.init({}));
  const initialState = {
    render: false,
    token: "",
    stage: 1,
    navigatingBack: true,
    dob: new Date(),
    email: "",
    isNri: false,
    name: "",
    panNumber: "",
    panError: "",
    phoneNumber: "",
    countryCode: "+91",
    emailOwnerUserId: "",
    emailRelation: "",
    phoneOwnerUserId: "",
    phoneRelation: "",
    panUsageType: "",
    isPhoneVerified: false,
    isEmailVerified: false,
    onBoardingProfiles: []
  };

  const [state, dispatch] = useReducer((state, {type, name, value}) => {
    state = {...state, navigatingBack: false};
    switch (type) {
      case "update":
        if (name === "panNumber") {
          if (!WealthyValidations.validateFormField.pan(value)) {
            state = {
              ...state,
              panError: "Please check the pan entered"
            };
          } else {
            state = {
              ...state,
              panError: ""
            };
          }
        }
        return state = {...state, [name]: value};
      case "batch-update":
        return state = {...state, ...value};
      case "back":
        return state = {...state, stage: state.stage > 1 ? state.stage - 1 : state.stage, navigatingBack: true};
      case "mobile-otp":
        return state = {...state, stage: 8};
      case "email-otp":
        return state = {...state, stage: 9};
      default: return state;
    }
  }, initialState);
  
  useEffect(() => {
    if (hagrid) {
      const data = UserProfileModel.init(hagrid.wealthyUserDetailsPrefill);
      setUser(data);
      
      if (emptyChecker(data.kycUrl)) {
        const domain = WealthyEnv.IS_LOCAL ? "http://localhost:9000" : WealthyEnv.API_URL;
        window.location.assign(`${data.kycUrl}&redirect_to=${domain}${WealthyUtils.getSessionStorageKey("kycDestination")}`, "_self");
        return;
      }
      
      const {
        dob,
        email,
        name,
        phoneNumber,
        panNumber,
        emailRelation,
        phoneRelation,
        families,
        userId,
        isEmailVerified,
        isPhoneVerified
      } = data;

      let emailOwnerUserId, phoneOwnerUserId;
  
      if (families.length) {
        emailOwnerUserId = families[0].ownerDetails.ownerUserId;
        phoneOwnerUserId = families[0].ownerDetails.ownerUserId;
      }
      
      const mobile = emptyChecker(phoneNumber) ? phoneNumber.split(")")[1] || phoneNumber : "";
      const countryCode = emptyChecker(phoneNumber) && phoneNumber.split("(")[1] && phoneNumber.split("(")[1].split(")")[0] ? phoneNumber.split("(")[1].split(")")[0] : "+91";
  
      const value = {
        token: "",
        dob: dob.exists() ? WealthyUtils.decodeDateFormatWithHyphen(dob) : "",
        email: emptyChecker(email),
        name: emptyChecker(name),
        panNumber: emptyChecker(panNumber),
        phoneNumber: mobile,
        countryCode,
        isEmailVerified,
        isPhoneVerified,
        emailOwnerUserId: emptyChecker(emailOwnerUserId) || userId,
        emailRelation: emptyChecker(emailRelation) || "self",
        phoneOwnerUserId: emptyChecker(phoneOwnerUserId) || userId,
        phoneRelation: emptyChecker(phoneRelation) || "self",
        panUsageType: "INDIVIDUAL",
        onBoardingProfiles: ["MF"],
        panUsageSubtype: "NON_NRI",
        render: true
      };
  
      dispatch({type: "batch-update", value});
    }
  }, [hagrid, loading, error]);

  useEffect(() => {
  }, [state.phoneRelation, state.emailRelation]);

  const emptyChecker = (value) => {
    return value && value !== "-" ? value : "";
  };
  
  return (
    <ProposalKyc
      dispatch={dispatch}
      error={error}
      loading={loading}
      state={state}
      user={user}
    />
  );
};

const withData = graphql(PREFILL_QUERY, {
  props: ({data: {
    hagrid,
    loading,
    error
  }}) => ({
    hagrid,
    loading,
    error
  }),
  options: () => ({
    variables: {
      onBoardProduct: "MF",
      declarationType: "basic"
    }
  })
});

ProposalKycContainer.propTypes = propTypes;

export default withData(ProposalKycContainer);
