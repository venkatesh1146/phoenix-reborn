import humps from 'humps'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getMFSwitchUrlWithProposalId } from '~/utils/UrlUtils'

import ProposalData from './MockResponse.json'

import { MF_SWITCH_PROPOSAL_STAGES } from '~/constants'
import { MFSwitchStatusResponseType } from '~/constants/interfaces'
import { MF_SWITCH_ROUTES } from '~/constants/routes'

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
      new Promise((res, _) => {
        setTimeout(() => {
          res(ProposalData)
        }, 2000)
      }).then((res: any) => {
        const pathAsPerStatus = getPathBasedOnStatus(res.status)
        if (router.pathname !== pathAsPerStatus) {
          router.push(
            getMFSwitchUrlWithProposalId(
              pathAsPerStatus ?? '',
              proposalId as string
            )
          )
        } else
          setProposalData({
            isLoading: false,
            proposalData: humps.camelizeKeys(res) as any,
            error: null,
          })
      })

      //   getProposalStatus(proposalId as string)
      //     .then((res) => {
      //       const data = {
      //         ...ProposalData,
      //       }
      //       const pathAsPerStatus = getPathBasedOnStatus(data.status) ?? ''
      //       if (router.pathname !== pathAsPerStatus) {
      //         router.push(
      //           getMFSwitchUrlWithProposalId(
      //             pathAsPerStatus,
      //             proposalId as string
      //           )
      //         )
      //       } else
      //         setProposalData({
      //           isLoading: false,
      //           proposalData: res.data,
      //           error: null,
      //         })
      //     })
      //     .catch((e) => toast.error(getErrorMessage(e)))
    }
  }

  useEffect(() => {
    getProposal()
  }, [proposalId])

  return { ...state, getProposal, getAMCLogos }
}
