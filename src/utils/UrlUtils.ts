export const getMFSwitchUrlWithProposalId = (
  path: string,
  proposalId: string
) => {
  return `/proposal/${proposalId}${path}`
}
