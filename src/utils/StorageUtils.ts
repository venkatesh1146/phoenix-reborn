import Cookie from 'js-cookie'

import WealthyEncrypt from './EncryptionUtils'
import { handleApiError } from './ErrorUtils'
import WealthyEnv from './env'

import { StorageConstants } from '~/constants'
import { checkToken, submitTwoFa } from '~/rest/login'
const ns = 'wl_'

/**
 * Returns access or refresh token key, defaults to access key
 * @param  {string} tokenType access/refresh
 * @return {string}           access or refresh token key
 */
const getTokenType = (tokenType: string) => {
  return tokenType === 'refresh'
    ? StorageConstants.REFRESH_TOKEN_KEY
    : StorageConstants.ACCESS_TOKEN_KEY
}

const appendNameSpace = (key: any) => ns + key

const setCookie = (
  key: string,
  val: any,
  options?: any,
  globalNamespace = false
) => {
  const cookieKey = globalNamespace ? key : appendNameSpace(key)
  options = { ...options, domain: WealthyEnv.COOKIE_DOMAIN }
  Cookie.set(cookieKey, val, options)
}

const getCookie = (key: any, globalNamespace = false) => {
  const cookieKey = globalNamespace ? key : appendNameSpace(key)
  return Cookie.get(cookieKey)
}

const removeCookie = (
  key: any,
  options?: Cookie.CookieAttributes | undefined,
  globalNamespace = false
) => {
  const cookieKey = globalNamespace ? key : appendNameSpace(key)
  options = { ...options, domain: WealthyEnv.COOKIE_DOMAIN }
  Cookie.remove(cookieKey, options)
}

const removeAuthTokens = () => {
  WealthyStorage.removeCookie(StorageConstants.ACCESS_TOKEN_KEY)
  WealthyStorage.removeCookie('access_token_expiry')
  WealthyStorage.removeCookie(StorageConstants.REFRESH_TOKEN_KEY)
  WealthyStorage.removeCookie(StorageConstants.RSESSIONID_KEY, {}, true)
}

const removeProposalAuthTokens = () => {
  WealthyStorage.removeCookie('proposal_access_token')
  WealthyStorage.removeCookie('proposal_access_token_expiry')
  WealthyStorage.removeCookie(StorageConstants.RSESSIONID_KEY, {}, true)
}

const clearCookies = () => {
  const cookies = document.cookie
  cookies.split(';').forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
  })
}

const setToken = (token: any, expiry: number, tokenType = 'access') => {
  const expiryTime = new Date(new Date().getTime() + expiry * 1000)
  const encryptedToken = WealthyEncrypt.encryptToken(token)
  setCookie(getTokenType(tokenType), encryptedToken, { expires: expiryTime })
}
const setRefreshToken = (token: any, expiry: number) => {
  setToken(token, expiry, 'refresh')
}

const setAccessToken = (token: any, expiry: number) => {
  setToken(token, expiry)
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
          window.location.assign(`${redirectUrl}?need_pin=true`)
          // window.location.assign(`${domain}/mfa?redirect_url=${redirectUrl}`, "_self");
          break
        case 'TOKEN_EXPIRED':
          submitTwoFa('123456', getToken())
            .then(({ data }) => {
              setAccessToken(data.accessToken, data.accessTokenExpiry)
              setRefreshToken(data.refreshToken, data.refreshTokenExpiry)
              setCookie('refresh_token_expiry', data.refreshTokenExpiry)
              setCookie('access_token_expiry', Date.now() + data.expiryIn)
            })
            .catch(handleApiError)
          break
        case 'TOKEN_PERMANENTLY_EXPIRED':
          removeAuthTokens()
          removeProposalAuthTokens()
          window.location.assign(`${domain}/auth/login`)
          break
        case 'LOGIN_SUCCESS':
          return true
        default:
          break
      }
    })
    .catch((err) => {
      handleApiError(err)
      removeAuthTokens()
      removeProposalAuthTokens()
      window.location.assign(`${domain}/auth/login`)
    })
  return true
}

const setProposalAccessToken = (token, expiry) => {
  const expiryTime = Date.now() + expiry * 1000
  const encryptedToken = WealthyEncrypt.encryptToken(token)
  setCookie('proposal_access_token', encryptedToken, { expires: expiryTime })
  setCookie('proposal_access_token_expiry', expiryTime)
}

const getProposalAccessToken = () => {
  const token = getCookie('proposal_access_token')
  const decrypedToken = token ? WealthyEncrypt.decryptToken(token) : null
  const expiry = parseInt(getCookie('proposal_access_token_expiry') || '')
  if (expiry && expiry > Date.now()) {
    return decrypedToken
  }
  if (expiry && expiry <= Date.now()) {
    removeCookie(StorageConstants.RSESSIONID_KEY, {}, true)
    removeCookie('proposal_access_token')
  }
  return decrypedToken || null
}

const getStore = (store: string) => {
  return store === 'session' ? window.sessionStorage : window.localStorage
}

const getStorage = (key: any, store = 'local') => {
  const currStore = getStore(store)
  const value = currStore.getItem(appendNameSpace(key))
  return value ? JSON.parse(value) : value
}

const setStorage = (key: any, value: any, store = 'local') => {
  const currStore = getStore(store)
  currStore.setItem(appendNameSpace(key), JSON.stringify(value))
}

const removeStorage = (key: any, store = 'local') => {
  const currStore = getStore(store)
  currStore.removeItem(appendNameSpace(key))
}

const clearStorage = (store = 'local') => {
  const currStore = getStore(store)
  currStore.clear()
}

const getToken = (tokenType = 'access') => {
  const encryptedToken = WealthyStorage.getCookie(getTokenType(tokenType))
  if (!encryptedToken) return encryptedToken
  const decryptedToken = WealthyEncrypt.decryptToken(encryptedToken)
  return decryptedToken
}

const getAccessToken = () => {
  const expiry = parseInt(WealthyStorage.getCookie('access_token_expiry') ?? '')

  if (expiry && expiry > Date.now()) {
    return getToken()
  }
  if (expiry && expiry <= Date.now()) {
    removeCookie(StorageConstants.RSESSIONID_KEY, {}, true)
    return tokenCheck() ? getToken() : null
  }
  return null
}

const getSessionStorageKey = (key: string) => {
  return WealthyStorage.getStorage(key, 'session')
}

const getGlobalCookie = (key) => {
  return getCookie(key, true)
}

const WealthyStorage = {
  setCookie,
  getCookie,
  removeCookie,
  getStorage,
  setStorage,
  removeStorage,
  clearCookies,
  clearStorage,
  getSessionStorageKey,
  getAccessToken,
  getProposalAccessToken,
  getGlobalCookie,
  setProposalAccessToken,
}

export default WealthyStorage
