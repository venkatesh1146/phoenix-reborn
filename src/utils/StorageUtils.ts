import Cookie from 'js-cookie'

import WealthyEnv from './env'
const localStore = window.localStorage
const sessionStore = window.sessionStorage
const ns = 'wl_'

const appendNameSpace = (key: any) => ns + key

const setCookie = (
  key: string,
  val: any,
  options: any,
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
  options: Cookie.CookieAttributes | undefined,
  globalNamespace = false
) => {
  const cookieKey = globalNamespace ? key : appendNameSpace(key)
  options = { ...options, domain: WealthyEnv.COOKIE_DOMAIN }
  Cookie.remove(cookieKey, options)
}

const clearCookies = () => {
  const cookies = document.cookie
  cookies.split(';').forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
  })
}

const getStore = (store: string) => {
  return store === 'session' ? sessionStore : localStore
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
  const expiry = WealthyStorage.getCookie('access_token_expiry')

  if (expiry && expiry > Date.now()) {
    return getToken()
  }
  if (expiry && expiry <= Date.now()) {
    WealthyStorage.removeCookie(storageConstants.RSESSIONID_KEY, true)
    return tokenCheck() ? getToken() : null
  }
  return null
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
}

export default WealthyStorage
