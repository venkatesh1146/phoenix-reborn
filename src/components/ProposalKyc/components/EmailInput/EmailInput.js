/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import React from "react";

import PropTypes from "prop-types";
import styled, {css} from "styled-components";
import {
  Button,
  Icon,
  Input
} from "components";
import Family from "../Family";

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const EmailInput = ({
  dispatch,
  onChangeHandler,
  onSubmit,
  state,
  user
}) => {
  const rendered = user.families.length ? user.emailDeclaration.template.replace("{name}", user.name).replace("{relation}", `my ${state.emailRelation}`) : user.emailDeclaration.rendered;

  return (
    <EmailInputWrapper>
      <Container>
        <Title>Choose Email for investment</Title>
        <InputsContainer>
          <form style={{marginBottom: "3.3rem"}} onSubmit={onSubmit}>
            {
              user.families.length ? (
                <Family
                  dispatch={dispatch}
                  user={user}
                />
              ) : null
            }
            <Label>Email Id</Label>
            <InputContainer>
              <Input
                inputType='registration'
                isDisabled={state.isEmailVerified}
                isError={false}
                name='email'
                placeholder=''
                value={state.email}
                width='fill'
                onChange={onChangeHandler}
              />
              <VerificationStatus status={state.isEmailVerified}>
                {state.isEmailVerified && <Icon name='wl-icon-check-circle' />}
              </VerificationStatus>
            </InputContainer>
            <p>{rendered}</p>
            <Button
              isDisabled={!state.email.length}
              label='Proceed'
              margin="3em 0"
              onClick={onSubmit}
            />
          </form>
        </InputsContainer>
      </Container>
    </EmailInputWrapper>
  );
};

const EmailInputWrapper = styled.div`
  height: 100vh;
  width: 50%;
  margin: 0 auto;
  position: relative;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Container = styled.div`
  padding: 2.4rem 0;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 400;
  color: #000000;
  font-family: DmSerif;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Label = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: #7E7E7E;
`;

const InputsContainer = styled.div`
  margin: 3rem 0 0 0;
  width: 60%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const VerificationStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -3.2em;
  position: absolute;
  right: 1em;
  color: red;
  ${props => props.status && css`
    color: #51a905;
  `}
  text-transform: uppercase;
  font-size: .8em;
  i{
    margin-right: 0.5em;
    margin-bottom: 4px;
    color: #51a905;
    font-size: 1.25em;
  }
`;

EmailInput.propTypes = propTypes;

export default EmailInput;
