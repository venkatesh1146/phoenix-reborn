import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

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

  const getAMCLogos = () => {
    return state.proposalData?.schemes.map((s) => s?.amcIconUrl)
  }

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
      getProposalStatus(proposalId as string)
        .then((res) => {
          const data = {
            ...ProposalData,
          }
          navigateBasedOnStatus(proposalId as string, data.status)
          setProposalData({
            isLoading: false,
            proposalData: res.data,
            error: null,
          })
        })
        .catch((e) => toast.error(getErrorMessage(e)))
    }
  }

  useEffect(() => {
    getProposal()
  }, [proposalId])

  return { ...state, getProposal, getAMCLogos }
}
