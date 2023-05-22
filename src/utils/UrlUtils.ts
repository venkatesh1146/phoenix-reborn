export const getMFSwitchUrlWithProposalId = (
  path: string,
  proposalId: string
) => {
  return `${path}?proposal_id=${proposalId}`
}
