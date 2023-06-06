import CryptoJS from 'crypto-js'

const KEY = CryptoJS.enc.Hex.parse(
  '01ab38d5e05c92aa098921d9d4626107133c7e2ab0e4849558921ebcc242bcb0'
)
const IV = CryptoJS.enc.Hex.parse('832ae036533f89fa2783d5db4a0d9598')

const decryptToken = (data) => {
  if (!data) {
    return ''
  }

  let cipher, result
  cipher = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(data),
  })
  result = CryptoJS.AES.decrypt(cipher, KEY, {
    iv: IV,
    padding: CryptoJS.pad.NoPadding,
    mode: CryptoJS.mode.CFB,
  })

  result = result.toString(CryptoJS.enc.Utf8)
  // eslint-disable-next-line no-control-regex
  return result.replace(/[\x00-\x1F\x7F-\x9F]/g, '')
}

const padString = (source) => {
  const paddingChar = ' '
  const size = 16
  const x = source.length % size
  const padLength = size - x
  for (let i = 0; i < padLength; i++) source += paddingChar
  return source
}

const encryptToken = (data) => {
  // let result = CryptoJS.AES.encrypt(padString(data), KEY, {
  const result = CryptoJS.AES.encrypt(data, KEY, {
    iv: IV,
    // padding: CryptoJS.pad.NoPadding,
    mode: CryptoJS.mode.CFB,
  })
  return result.toString()
}

const WealthyEncrypt = {
  encryptToken,
  decryptToken,
}

export default WealthyEncrypt
