import WealthyEncrypt from './EncryptionUtils'
import WealthyStorage from './StorageUtils'
import WealthyEnv from './env'

import { StorageConstants } from '~/constants'

const getTokenType = (tokenType) => {
  return tokenType === 'refresh'
    ? StorageConstants.REFRESH_TOKEN_KEY
    : StorageConstants.ACCESS_TOKEN_KEY
}

const getToken = (tokenType = 'access') => {
  const encryptedToken = WealthyStorage.getCookie(getTokenType(tokenType))
  if (!encryptedToken) return encryptedToken
  const decryptedToken = WealthyEncrypt.decryptToken(encryptedToken)
  return decryptedToken
}
const tokenCheck = () => {
  const domain = WealthyEnv.IS_LOCAL
    ? 'http://localhost:9000'
    : WealthyEnv.API_URL
  const redirectUrl = `${domain}${window.location.pathname}`
  const auth = getToken()
  checkToken(auth)
    .then(({ data }) => {
      switch (data.nextStep) {
        case 'TWOFA_INPUT':
          WealthyStorage.removeCookie('access_token_expiry')
          window.location.assign(`${redirectUrl}?need_pin=true`, '_self')
          // window.location.assign(`${domain}/mfa?redirect_url=${redirectUrl}`, "_self");
          break
        case 'TOKEN_EXPIRED':
          submitTwoFa('123456', getToken())
            .then(({ data }) => {
              WealthyUtils.setAccessToken(
                data.accessToken,
                data.accessTokenExpiry
              )
              WealthyUtils.setRefreshToken(
                data.refreshToken,
                data.refreshTokenExpiry
              )
              WealthyStorage.setCookie(
                'refresh_token_expiry',
                data.refreshTokenExpiry
              )
              WealthyStorage.setCookie(
                'access_token_expiry',
                Date.now() + data.expiryIn
              )
            })
            .catch(WealthyUtils.handleApiError)
          break
        case 'TOKEN_PERMANENTLY_EXPIRED':
          removeAuthTokens()
          removeProposalAuthTokens()
          window.location.assign(`${domain}/auth/login`, '_self')
          break
        case 'LOGIN_SUCCESS':
          return true
        default:
          break
      }
    })
    .catch((err) => {
      WealthyUtils.handleApiError(err)
      removeAuthTokens()
      removeProposalAuthTokens()
      window.location.assign(`${domain}/auth/login`, '_self')
    })
  return true
}

export default {
  getAccessToken() {
    const expiry = WealthyStorage.getCookie('access_token_expiry')

    if (expiry && expiry > Date.now()) {
      return getToken()
    }
    if (expiry && expiry <= Date.now()) {
      WealthyStorage.removeCookie(StorageConstants.RSESSIONID_KEY, true)
      return tokenCheck() ? getToken() : null
    }
    return null
  },
  getProposalAccessToken() {
    const token = WealthyStorage.getCookie('proposal_access_token')
    const decrypedToken = token ? WealthyEncrypt.decryptToken(token) : null
    const expiry = WealthyStorage.getCookie('proposal_access_token_expiry')
    if (expiry && expiry > Date.now()) {
      return decrypedToken
    }
    if (expiry && expiry <= Date.now()) {
      WealthyStorage.removeCookie(StorageConstants.RSESSIONID_KEY, true)
      WealthyStorage.removeCookie('proposal_access_token')
    }
    return decrypedToken || null
  },
  getRefreshToken() {
    return getToken('refresh')
  },
}
