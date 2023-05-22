import humps from 'humps'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { getErrorMessage } from '~/utils/ErrorUtils'
import { getMFSwitchUrlWithProposalId } from '~/utils/UrlUtils'

import ProposalData from './MockResponse.json'

import { MF_SWITCH_PROPOSAL_STAGES } from '~/constants'
import { MFSwitchStatusResponseType } from '~/constants/interfaces'
import { MF_SWITCH_ROUTES } from '~/constants/routes'
import { getProposalStatus } from '~/rest/MFSwitch'

interface MFSwitchProposalStateType {
  isLoading: boolean
  proposalData: null | MFSwitchStatusResponseType
  error: null | Error
}

export default function useMFSwitchProposal() {
  const [state, setProposalData] = useState<MFSwitchProposalStateType>({
    isLoading: true,
    proposalData: null,
    error: null,
  })

  const router = useRouter()
  const proposalId = router.query.proposalId || router.query.proposal_id

  const navigateBasedOnStatus = (proposalId: string, status: string) => {
    switch (status) {
      case MF_SWITCH_PROPOSAL_STAGES.clientInitiated:
      case MF_SWITCH_PROPOSAL_STAGES.clientApprovalAwaited:
        router.push(
          getMFSwitchUrlWithProposalId(MF_SWITCH_ROUTES.proposal, proposalId)
        )
        break
      case MF_SWITCH_PROPOSAL_STAGES.userKycAwaited:
        router.push(
          getMFSwitchUrlWithProposalId(
            MF_SWITCH_ROUTES.kycVerification,
            proposalId
          )
        )
        break
      case MF_SWITCH_PROPOSAL_STAGES.orderPlaced:
        router.push(
          getMFSwitchUrlWithProposalId(MF_SWITCH_ROUTES.orderPlaced, proposalId)
        )
        break
      case MF_SWITCH_PROPOSAL_STAGES.completed:
        router.push(
          getMFSwitchUrlWithProposalId(MF_SWITCH_ROUTES.success, proposalId)
        )
        break
      default:
        break
    }
  }

  const getProposal = () => {
    if (proposalId) {
      new Promise((res, rej) => {
        setTimeout(() => {
          res(ProposalData)
        }, 2000)
      }).then((res: any) => {
        console.log('TCL: getProposal -> res', humps.camelizeKeys(res))
        const data = {
          ...ProposalData,
        }
        navigateBasedOnStatus(proposalId as string, data.status)
        setProposalData({
          isLoading: false,
          proposalData: humps.camelizeKeys(res),
          error: null,
        })
      })

      //   getProposalStatus(proposalId as string)
      //     .then((res) => {
      //       const data = {
      //         ...ProposalData,
      //       }
      //       navigateBasedOnStatus(proposalId as string, data.status)
      //       setProposalData({
      //         isLoading: false,
      //         proposalData: res.data,
      //         error: null,
      //       })
      //     })
      //     .catch((e) => console.log(getErrorMessage(e)))
    } else {
      // redirect to 404
    }
  }

  useEffect(() => {
    getProposal()
  }, [proposalId])

  return state
}
