/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { styled } from '@linaria/react'
import React from 'react'

import { PrimaryButton } from '~/components/Base/Buttons'
import DateInput from '~/components/Base/DateInput'
import Input from '~/components/Base/Input'
import PopupModal from '~/components/Base/Popup'
import Spinner from '~/components/common/Spinner'

import 'rc-dialog/assets/index.css'
import css from './styles.module.scss'

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
    <>
      <PersonalDetailsWrapper>
        <SubHeader className="section-title">
          Confirm your personal details
        </SubHeader>

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
              width="small"
              onChange={onChangeHandler}
              containerStyles={{ width: 'max-content' }}
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

          <PrimaryButton
            disabled={
              panNumber.length !== 10 ||
              panError ||
              !dob ||
              loading ||
              checkingPan
            }
            onClick={onProceed}
            className="proceed-btn"
          >
            {checkingPan ? <Spinner color={'#fff'} /> : 'Proceed'}
          </PrimaryButton>
        </form>
      </PersonalDetailsWrapper>
      <PopupModal
        classNames={{
          modal_dialog: css.modal_dialog,
          modal_content: css.modal_content,
        }}
        close={() => setShowModal(false)}
        shouldShow={showModal}
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
            <PrimaryButton
              style={{ padding: '0 3rem', marginTop: '1rem', height: '2.5rem' }}
              disabled={loading}
              onClick={onSubmit}
            >
              {loading ? <Spinner /> : 'Proceed'}
            </PrimaryButton>
          </form>
        </ConfirmationWrapper>
      </PopupModal>
    </>
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
  width: 100%;
  p {
    font-size: 1.3rem;
  }
`

const PersonalDetailsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .proceed-btn {
    width: 100%;
    margin-top: auto;
  }
  form {
    height: 100%;
  }
`

const Title = styled.h1`
  font-family: 'Marcellus';
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 24px;
`

const SubHeader = styled.p`
  margin: 6px 0;
  padding: 0;
  color: #7e7e7e;
  font-size: 1rem !important;
  font-family: MavenPro;
`

const InputContainer = styled.div`
  margin-bottom: 1rem;
  .date-input {
    min-width: 12rem;
  }
`

const Label = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #7e7e7e;
  margin-bottom: 0.5rem;
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
