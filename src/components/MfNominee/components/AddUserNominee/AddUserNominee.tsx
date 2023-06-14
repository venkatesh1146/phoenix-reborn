/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

import { styled } from '@linaria/react'
import { NomineeRelationshipType } from 'frontend-models'
import PropTypes from 'prop-types'
import Select, { Option } from 'rc-select'
import React from 'react'
import 'rc-select/assets/index.css'

import { PrimaryButton } from '~/components/Base/Buttons'
import DateInput from '~/components/Base/DateInput'
import Input from '~/components/Base/Input'
import OnboardingBack from '~/components/common/OnboardingBack'
import Spinner from '~/components/common/Spinner'
import { tm } from '~/styles/theme'

const propTypes = {
  guardianDob: PropTypes.string.isRequired,
  guardianName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isNomineeAdult: PropTypes.bool.isRequired,
  nomineeDob: PropTypes.string.isRequired,
  nomineeDobErr: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  nomineeName: PropTypes.string.isRequired,
  nomineeRelationship: PropTypes.string.isRequired,
  onProceed: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  setGuardianDob: PropTypes.func.isRequired,
  setGuardianName: PropTypes.func.isRequired,
  setNomineeDob: PropTypes.func.isRequired,
  setNomineeName: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
}

const NomineeDetailsForm = ({
  guardianDob,
  guardianName,
  isLoading,
  isNomineeAdult,
  nomineeDob,
  nomineeDobErr,
  nomineeName,
  nomineeRelationship,
  onProceed,
  onSelect,
  setGuardianDob,
  setGuardianName,
  setNomineeDob,
  setNomineeName,
  setShowForm,
}) => {
  const today = new Date().toISOString().substring(0, 10)
  const startDate = `${Number(today.split('-')[0]) - 18}-${
    today.split('-')[1]
  }-${today.split('-')[2]}`
  const disableProceed = isLoading || !nomineeDob || !nomineeName
  const nomineeRelationshipOptions: JSX.Element[] = []
  for (const [name, value] of Object.entries(NomineeRelationshipType)) {
    nomineeRelationshipOptions.push(
      <Option key={name} optKey={value}>
        <> {value}</>
      </Option>
    )
  }
  return (
    <>
      <BackContainer>
        <OnboardingBack goBackFunction={() => setShowForm(false)} size="3em" />
      </BackContainer>
      <NomineeDetails>
        <HeaderWrapper>
          <Heading>Nominee Details</Heading>
          <Text>You may add a nominee for your investments</Text>
        </HeaderWrapper>

        <Container>
          <Label>Nominee Name:</Label>
          <Input
            inputType="registration"
            isDisabled={isLoading}
            name="nomineeName"
            placeholder="Nominee name"
            value={nomineeName}
            width="large"
            onChange={(event) => setNomineeName(event.target.value)}
          />
        </Container>
        <Container>
          <Label>Nominee Relation</Label>
          <SelectWrapper>
            <Select
              animation="slide-up"
              placeholder="Nominee relationship"
              showSearch={false}
              value={
                nomineeRelationship === '' ? undefined : nomineeRelationship
              }
              onSelect={onSelect}
            >
              {nomineeRelationshipOptions}
            </Select>
          </SelectWrapper>
        </Container>
        <Container>
          <Label>Nominee DOB</Label>
          <DateInput
            inputType="registration"
            isDisabled={isLoading}
            isInvalid={nomineeDobErr}
            max={today}
            name="nomineeDOB"
            placeholder="Nominee's DoB (DD/MM/YYYY)"
            value={nomineeDob}
            width="large"
            onChange={(event) => setNomineeDob(event.target.value)}
          />
        </Container>

        {!isNomineeAdult ? (
          <div>
            <Input
              inputType="registration"
              isDisabled={isLoading}
              name="guardianName"
              placeholder="Nominee's guardian name"
              value={guardianName}
              width="large"
              onChange={(event) => setGuardianName(event.target.value)}
            />
            <DateInput
              inputType="registration"
              isDisabled={isLoading}
              max={startDate}
              name="guardianDob"
              placeholder="Guardian's DoB (DD/MM/YYYY)"
              style={{ marginBottom: '1rem' }}
              value={guardianDob}
              width="normal"
              // isInvalid={guardianDobError}
              onChange={(event) => setGuardianDob(event.target.value)}
            />
            <Label>Guardian DOB</Label>
          </div>
        ) : null}
        <>
          <PrimaryButton
            style={{ marginTop: 'auto' }}
            disabled={disableProceed}
            onClick={onProceed}
          >
            {isLoading ? 'Proceed' : <Spinner />}
          </PrimaryButton>
        </>
      </NomineeDetails>
    </>
  )
}

const Heading = styled.h1`
  text-align: left;
`

const BackContainer = styled.div`
  position: absolute;
  top: -2em;
  left: 1em;
`

const Label = styled.label``

const HeaderWrapper = styled.div`
  > h1 {
    margin-top: 0;
  }
`

const Container = styled.div``

const NomineeDetails = styled(Container)`
  padding: 2rem;
  margin-top: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
`

const SelectWrapper = styled.div`
  .rc-select {
    width: 100%;
    min-width: 150px;
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

const Text = styled.p`
  text-align: left;
`

NomineeDetailsForm.propTypes = propTypes

export default NomineeDetailsForm
