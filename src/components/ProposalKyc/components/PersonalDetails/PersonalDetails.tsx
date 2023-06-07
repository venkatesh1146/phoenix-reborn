/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { styled } from '@linaria/react'
import Dialog from 'rc-dialog'
import React from 'react'

import Button from '~/components/Base/Button'
import DateInput from '~/components/Base/DateInput'
import Input from '~/components/Base/Input'

interface PersonalDetailsPropTypes {
  checkedState: any[]
  checkField: any[]
  checkingPan: boolean
  errorMsg: string
  handleOnCheckboxChange: (param: any) => void
  loading: boolean
  name: string
  onChangeHandler: (param: any) => void
  onProceed: (param: any) => void
  onSubmit: (param: any) => void
  setShowModal: (param: any) => void
  showModal: boolean
  state: Record<string, any>
}

const today = new Date().toISOString().substring(0, 10)
const startDate = `${Number(today.split('-')[0]) - 18}-${today.split('-')[1]}-${
  today.split('-')[2]
}`

const PersonalDetails = ({
  checkedState,
  checkField,
  checkingPan,
  errorMsg,
  handleOnCheckboxChange,
  loading,
  name,
  onChangeHandler,
  onProceed,
  onSubmit,
  setShowModal,
  showModal,
  state,
}: PersonalDetailsPropTypes) => {
  const { panError, panNumber, dob } = state

  return (
    <PersonalDetailsWrapper>
      <Container>
        <Title>Personal Details</Title>
        <SubHeader>Confirm your personal details</SubHeader>
        <InputsContainer>
          <form onSubmit={onProceed}>
            <InputContainer>
              <Label>PAN</Label>
              <Input
                inputType="registration"
                isInvalid={panError}
                name="panNumber"
                placeholder=""
                transform="uppercase"
                value={panNumber}
                width="full"
                onChange={onChangeHandler}
                onPaste={onChangeHandler}
              />
            </InputContainer>

            <InputContainer>
              <Label>Date of birth</Label>
              <DateInput
                inputType="registration"
                max={startDate}
                name="dob"
                placeholder="dd/mm/yyyy"
                value={dob}
                width="full"
                onChange={onChangeHandler}
              />
            </InputContainer>

            {checkField.map(({ name }, index) => {
              return (
                <CheckBoxContainer
                  key={name}
                  onClick={() => handleOnCheckboxChange(index)}
                >
                  <CheckBox
                    readOnly
                    checked={checkedState[index]}
                    name={name}
                    type="checkbox"
                    value={name}
                  />
                  <CheckboxText>{name}</CheckboxText>
                </CheckBoxContainer>
              )
            })}

            <Button
              disabled={
                panNumber.length !== 10 ||
                panError ||
                !dob ||
                loading ||
                checkingPan
              }
              isLoading={checkingPan}
              label="Proceed"
              margin="3em 0"
              onClick={onProceed}
            />
          </form>
        </InputsContainer>
      </Container>
      <Dialog
        animation="zoom"
        className="wl-payment-dialog custom-fullscreen"
        maskAnimation="fade"
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <ConfirmationWrapper>
          <Title>Kindly confirm your details</Title>
          <DetailWrapper>
            <SubHeader>
              Name: <Detail>{name}</Detail>
            </SubHeader>
            <SubHeader>
              Pan: <Detail>{panNumber}</Detail>
            </SubHeader>
            <SubHeader>
              DOB: <Detail>{dob}</Detail>
            </SubHeader>
          </DetailWrapper>
          {errorMsg && (
            <ErrorWrapper>
              <p>Note: {errorMsg}</p>
            </ErrorWrapper>
          )}
          <form onSubmit={onSubmit}>
            <Button
              disabled={loading}
              isLoading={loading}
              label="Proceed"
              margin="2em 0"
              onClick={onSubmit}
            >
              Proceed
            </Button>
          </form>
        </ConfirmationWrapper>
      </Dialog>
    </PersonalDetailsWrapper>
  )
}

const ErrorWrapper = styled.div`
  color: #856404;
  border: 1px solid #ffcaa1;
  background-color: #fff3cd;
  border-radius: 1rem;
  margin: 3em 3em 0;
  @media (max-width: 768px) {
    margin: 3em 1em 0;
  }
  font-size: smaller;
  padding: 2em;
`

const Detail = styled.span`
  float: right;
`

const DetailWrapper = styled.div`
  margin: auto;
  text-align: start;
  width: 70%;
  @media (max-width: 768px) {
    width: 90%;
  }
`

const ConfirmationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  > h1 {
    margin-top: 3rem;
  }
  p {
    font-size: 1.3em;
  }
  @media (max-width: 768px) {
    width: 90%;
    margin-top: 2em;
  }
`

const PersonalDetailsWrapper = styled.div`
  height: 100vh;
  width: 35%;
  margin: 0 auto;
  position: relative;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Container = styled.div`
  padding: 2.4rem 0;
  width: 90%;
  margin: 0 auto;
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 400;
  color: #000000;
  font-family: DmSerif;
`

const SubHeader = styled.p`
  margin: 1rem 0 0 0;
  padding: 0;
  color: #7e7e7e;
  font-size: 1.4rem;
  font-weight: 400;
  font-family: MavenPro;
`

const InputContainer = styled.div`
  margin-bottom: 3.3rem;
`

const Label = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: #7e7e7e;
  margin-bottom: 0;
`

const InputsContainer = styled.div`
  margin: 7rem 0 0 0;
`

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
`

const CheckBox = styled.input`
  margin-right: 1.5rem;
`

const CheckboxText = styled.p`
  color: #7e7e7e;
  font-size: 1rem;
`

export default PersonalDetails
