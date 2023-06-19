import { NextRouter } from 'next/router'

export const getMFSwitchUrlWithProposalId = (
  path: string,
  proposalId: string
) => {
  return `/proposal/${proposalId}${path}`
}

export const removeQueryParam = (router: NextRouter, paramName: string) => {
  const { pathname, query } = router

  const searchParams = new URLSearchParams(query as any)
  searchParams.delete(paramName)

  const queryString = searchParams.toString()

  router.replace({
    pathname: pathname,
    search: `?${queryString}`,
  })
}
