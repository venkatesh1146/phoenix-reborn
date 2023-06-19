import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { handleApiError } from '~/utils/ErrorUtils'
import WealthyStorage from '~/utils/StorageUtils'
import { removeQueryParam } from '~/utils/UrlUtils'

import { getAccessTokenUsingAuthToken } from '~/rest/login'

export default function useMFSwitchAuthToken() {
  const router = useRouter()
  const authToken = router.query.auth_token

  const getAccessTokenWithAuthToken = (token: string) => {
    getAccessTokenUsingAuthToken(token)
      .then((res: any) => {
        const tokenData = res.data
        WealthyStorage.setProposalAccessToken(
          tokenData.accessToken,
          tokenData.accessTokenExpiry
        )
        removeQueryParam(router, 'auth_token')
      })
      .catch(handleApiError)
  }

  useEffect(() => {
    if (authToken) {
      getAccessTokenWithAuthToken(authToken as string)
    }
  }, [authToken])
}
