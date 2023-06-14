/*
  Author : Om Athalye
  email: om96athalye@gmail.com
  Bitbucket: https://bitbucket.org/OmAthalye/
*/

'use strict'

import { NomineeRelationshipType, WealthyDate } from 'frontend-models'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import { handleApiError } from '~/utils/ErrorUtils'
import { showErrorToast, showSuccessToast } from '~/utils/ToastUtils'
import WealthyValidations from '~/utils/ValidationUtils'

import NomineeDetailsForm from './AddUserNominee'

const propTypes = {
  createUserNominee: PropTypes.func.isRequired,
  mfNomineeList: PropTypes.array.isRequired,
  setMfNomineeList: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
}

const NomineeDetailsFormContainer = ({
  createUserNominee,
  mfNomineeList,
  setMfNomineeList,
  setShowForm,
}) => {
  const [nomineeName, setNomineeName] = useState('')
  const [nomineeRelationship, setNomineeRelationship] = useState('')
  const [nomineeDob, setNomineeDob] = useState('')
  const [nomineeDobErr, setNomineeDobErr] = useState(false)
  const [isNomineeAdult, setIsNomineeAdult] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [guardianName, setGuardianName] = useState('')
  const [guardianDob, setGuardianDob] = useState('')

  useEffect(() => {
    if (nomineeDob) {
      setNomineeDobErr(false)
      let age = 0
      const ageFormat = WealthyDate.init(nomineeDob).ageFormat()
      if (ageFormat !== '-') {
        age = Number(ageFormat.slice(0, ageFormat.indexOf(' ')))
        if (isNaN(age)) {
          age = 0
        }
      }
      setIsNomineeAdult(age >= 18 ? true : false)
    }
  }, [nomineeDob])

  const onProceed = async () => {
    try {
      setIsLoading(true)
      if (
        !nomineeName ||
        !nomineeRelationship ||
        !nomineeDob ||
        nomineeDob.length !== 10 ||
        (!isNomineeAdult && !guardianName)
      ) {
        return showErrorToast('Please provide all the required information')
      }

      if (!WealthyValidations.validateFormField['name'](nomineeName)) {
        return showErrorToast('Please check the name entered')
      }

      let relationship
      for (const [key, value] of Object.entries(NomineeRelationshipType)) {
        if (nomineeRelationship === value) {
          relationship = key
        }
      }
      const payload: Record<string, any> = {
        name: nomineeName,
        relationship,
        dob: nomineeDob.slice(0, 10),
      }

      if (!isNomineeAdult) {
        payload.guardianName = guardianName
        payload.guardianDob = guardianDob.slice(0, 10)
      }

      await createUserNominee({ input: payload }).then(({ data }) => {
        const nomResult = data.createUserNominee.nominee
        const mfNomineeListCopy = [...mfNomineeList]
        nomResult.percentage =
          100 -
          mfNomineeListCopy.reduce(
            (total, nom) =>
              (total += !isNaN(nom.percentage) ? nom.percentage : 0),
            0
          )
        mfNomineeListCopy.splice(mfNomineeList.length - 1, 1, nomResult)
        setMfNomineeList(mfNomineeListCopy)
      })
      showSuccessToast('Nominee details updated')
      setShowForm(false)
    } catch (error: any) {
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSelect = (value, option) => {
    setNomineeRelationship(option.props.optKey)
  }

  return (
    <NomineeDetailsForm
      guardianDob={guardianDob}
      guardianName={guardianName}
      isLoading={isLoading}
      isNomineeAdult={isNomineeAdult}
      nomineeDob={nomineeDob}
      nomineeDobErr={nomineeDobErr}
      nomineeName={nomineeName}
      nomineeRelationship={nomineeRelationship}
      setGuardianDob={setGuardianDob}
      setGuardianName={setGuardianName}
      setNomineeDob={setNomineeDob}
      setNomineeName={setNomineeName}
      setShowForm={setShowForm}
      onProceed={onProceed}
      onSelect={onSelect}
    />
  )
}

NomineeDetailsFormContainer.propTypes = propTypes

export default NomineeDetailsFormContainer
