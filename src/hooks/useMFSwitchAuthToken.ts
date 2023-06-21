import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { handleApiError } from '~/utils/ErrorUtils'
import WealthyStorage from '~/utils/StorageUtils'
import { removeQueryParam } from '~/utils/UrlUtils'

import { getAccessTokenUsingAuthToken } from '~/rest/login'

export default function useMFSwitchAuthToken() {
  const router = useRouter()

  const getAccessTokenWithAuthToken = (token: string) => {
    getAccessTokenUsingAuthToken(token)
      .then((res: any) => {
        const tokenData = res.data
        WealthyStorage.setProposalAccessToken(
          tokenData.accessToken,
          tokenData.accessTokenExpiry
        )
        const url = removeQueryParam(router, 'auth_token')
        //FIXME: the below settimeout is used because the url is to fix the url not updating with the search params
        const id = setTimeout(() => {
          router.replace(url)
          clearTimeout(id)
        }, 0)
      })
      .catch(handleApiError)
  }

  useEffect(() => {
    if (router.isReady) {
      const authToken = router.query?.auth_token
      if (authToken) getAccessTokenWithAuthToken(authToken as string)
    }
  }, [router.isReady, router.query.auth_token])
}
