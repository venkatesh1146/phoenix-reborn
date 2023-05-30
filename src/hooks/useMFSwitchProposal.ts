import humps from 'humps'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { handleApiError } from '~/utils/ErrorUtils'
import { getMFSwitchUrlWithProposalId } from '~/utils/UrlUtils'

import ProposalData from './MockResponse.json'
import useRestApi from './useRestApi'

import { MF_SWITCH_PROPOSAL_STAGES } from '~/constants'
import { MFSwitchStatusResponseType } from '~/constants/interfaces'
import { MF_SWITCH_ROUTES } from '~/constants/routes'
import { getProposalStatus } from '~/rest/MFSwitch'

export default function useMFSwitchProposal() {
  const {
    isLoading,
    doApiCall,
    data: response,
    error,
    isSuccess,
    ...rest
  } = useRestApi<any, any, string, any>({
    apiFunction: getProposalStatus,
  })

  const router = useRouter()
  const proposalId = router.query.proposalId || router.query.proposal_id
  const getAMCLogos = () => {
    return response?.data?.schemes.map((s: any) => s?.amcIconUrl)
  }

  const getPathBasedOnStatus = (status: string) => {
    switch (status) {
      case MF_SWITCH_PROPOSAL_STAGES.clientInitiated:
      case MF_SWITCH_PROPOSAL_STAGES.clientApprovalAwaited:
        return MF_SWITCH_ROUTES.proposal
      case MF_SWITCH_PROPOSAL_STAGES.userKycAwaited:
        return MF_SWITCH_ROUTES.kycVerification
      case MF_SWITCH_PROPOSAL_STAGES.orderPlaced:
        return MF_SWITCH_ROUTES.orderPlaced
      case MF_SWITCH_PROPOSAL_STAGES.completed:
        return MF_SWITCH_ROUTES.success
      default:
        break
    }
  }

  const getProposal = () => {
    if (proposalId) {
      doApiCall(proposalId as string, {
        onSuccess: (response) => {
          const pathAsPerStatus =
            getPathBasedOnStatus(response.data.status) ?? ''
          if (router.pathname !== pathAsPerStatus) {
            router.push(
              getMFSwitchUrlWithProposalId(
                pathAsPerStatus,
                proposalId as string
              )
            )
          }
        },
        onError: handleApiError,
      })
    }
  }

  useEffect(() => {
    getProposal()
  }, [proposalId])

  return {
    isLoading,
    error,
    proposalData: response ? { ...response.data } : null,
    getProposal,
    getAMCLogos,
    isSuccess,
    ...rest,
  }
}
