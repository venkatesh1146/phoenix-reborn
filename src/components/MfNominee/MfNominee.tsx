/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { styled } from '@linaria/react'
import Select, { Option } from 'rc-select'
import React from 'react'

import { tm } from '~/styles/theme'
import { handleApiError } from '~/utils/ErrorUtils'

import ErrorPage from '../../components/ErrorPage'
import { PrimaryButton } from '../Base/Buttons'
import Image from '../Base/Image'
import Input from '../Base/Input'
import Spinner from '../common/Spinner'

import AddUserNominee from './components/AddUserNominee'

import 'rc-select/assets/index.css'
import { WealthyImages } from '~/assets'

interface MfNomineePropTypes {
  createUserNominee: (params: any) => Promise<any>
  error: boolean
  isLoading: boolean
  loading: boolean
  mfNomineeList: any[]
  onAdd: (params: any) => void
  onDelete: (params: any) => void
  onSelectNominee: (value, option, index) => void
  onSubmit: (params: any) => void
  setMfNomineeList: (params: any) => void
  setShowForm: (params: any) => void
  showForm: boolean
  userNomineeList: any[]
}

const MfNominee = ({
  createUserNominee,
  error,
  loading,
  isLoading,
  mfNomineeList,
  onAdd,
  onDelete,
  userNomineeList,
  setMfNomineeList,
  showForm,
  setShowForm,
  onSubmit,
  onSelectNominee,
}: MfNomineePropTypes) => {
  if (loading) {
    return (
      <NomineeLoader>
        <Spinner />
      </NomineeLoader>
    )
  }

  if (error) {
    handleApiError(error)
    return <ErrorPage />
  }

  if (showForm) {
    return (
      <AddUserNominee
        createUserNominee={createUserNominee}
        mfNomineeList={mfNomineeList}
        setMfNomineeList={setMfNomineeList}
        setShowForm={setShowForm}
      />
    )
  }

  const nomineeRelationshipOptions: any[] = []
  nomineeRelationshipOptions.push(
    <Option key={'add new'} optKey={'add new'}>
      Add new
    </Option>
  )

  userNomineeList.map((nominee) => {
    nomineeRelationshipOptions.push(
      <Option key={nominee.name} optKey={nominee}>
        {nominee.name}
      </Option>
    )
  })

  const formContent = (nominee: any = {}, index = 0) => (
    <FormContainer key={index}>
      <SelectWrapper>
        <Select
          animation="slide-up"
          placeholder="Select Nominee"
          showSearch={false}
          value={!nominee.name ? '' : nominee.name}
          onSelect={(value, option) => onSelectNominee(value, option, index)}
        >
          {nomineeRelationshipOptions}
        </Select>
      </SelectWrapper>
      <Input
        inputType="registration"
        isError={false}
        name="percentage"
        placeholder="%"
        value={!nominee.percentage ? '' : nominee.percentage}
        className="percentage-input"
        onChange={(event) => {
          if (event.target.value > 100 || event.target.value < 0) {
            return
          }
          const nomineeWithAllocation = Object.assign(
            {},
            mfNomineeList[index],
            { percentage: parseInt(event.target.value) }
          )
          const mfNomineeListCopy = [...mfNomineeList]
          mfNomineeListCopy.splice(index, 1, nomineeWithAllocation)
          setMfNomineeList(mfNomineeListCopy)
        }}
      />

      <DeleteButton onClick={() => onDelete(index)}>
        <Image
          alt="delete"
          src={WealthyImages.trashIcon}
          height={32}
          width={32}
        />
      </DeleteButton>
    </FormContainer>
  )

  return (
    <MfNomineeWrapper>
      <Title>Choose Nominees</Title>
      <Label>
        Please choose from the list of nominees to set as your MF nominee and
        assign appropriate percentage share.
      </Label>
      <Heading>
        <p>Nominee Name</p>
        <p>Percentage</p>
        <AddButton onClick={onAdd}>
          <Image alt="add" src={WealthyImages.addIcon} height={32} width={32} />
        </AddButton>
      </Heading>
      <InputsContainer>
        <form
          style={{ flexGrow: '1', display: 'flex', flexDirection: 'column' }}
          onSubmit={onSubmit}
        >
          {mfNomineeList.map((nominee, index) => formContent(nominee, index))}

          {mfNomineeList.length === 0
            ? formContent({}, mfNomineeList.length)
            : null}

          <PrimaryButton
            className="proceed-btn"
            disabled={isLoading}
            onClick={onSubmit}
          >
            {isLoading ? <Spinner /> : `Proceed`}
          </PrimaryButton>
        </form>
      </InputsContainer>
    </MfNomineeWrapper>
  )
}

const DeleteButton = styled.div`
  cursor: pointer;
  margin-right: 2rem;
  margin-left: 1rem;
`

const AddButton = styled.div`
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  margin-right: 2rem;
`

const MfNomineeWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  padding-top: 3rem;
`

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .percentage-input {
    margin: 4px 0;
    border: none;
    font-size: 1rem;
    color: ${tm((t) => t.colors.secondaryTextColor)};
    max-width: 100%;
  }
  .input-container {
    background: transparent;
    align-items: start;
    min-width: 120px;
    flex: 1;
  }
`

const Title = styled.h1`
  font-family: 'Marcellus';
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem !important;
  line-height: 24px;
  text-align: left;
`

const Label = styled.p`
  color: ${tm((t) => t.colors.secondaryTextColor)};
`

const InputsContainer = styled.div`
  margin: 0;
  display: flex;
  flex-grow: 1;
  .proceed-btn {
    width: 100%;
    margin-top: auto;
  }
`

const NomineeLoader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SelectWrapper = styled.div`
  padding-right: 2rem;
  min-width: 100px;
  flex: 1;
  .rc-select {
    width: 100%;
    .rc-select-arrow {
      top: unset;
    }
    .rc-select-selection {
      min-height: 2rem !important;
      border-radius: var(--card-radius);
      border: none;
      display: flex;
      align-items: center;
      height: inherit;
      &:hover {
        border-color: transparent;
        box-shadow: none;
      }
      &__rendered {
        flex: 1;
        color: ${tm((t) => t.colors.secondaryTextColor)};
        font-size: 1rem;
        margin-left: 1rem;
      }
    }
  }
`

const Heading = styled.div`
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  p {
    flex-grow: 1;
    flex: 1;
  }
  p:first-child {
    padding-right: 2rem;
    max-width: 60%;
  }
`

export default MfNominee
