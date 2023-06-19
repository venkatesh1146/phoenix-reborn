import * as MFSwitchAPIs from './MFSwitch/MFSwitch'
import * as MFSwitchFixtures from './MFSwitch/MFSwitch.fixtures'
import { checkToken, getAuthFromToken, submitTwoFa } from './login'

const shouldUseFixtures = true

const apis = {
  ...MFSwitchAPIs,
  checkToken,
  getAuthFromToken,
  submitTwoFa,
}

const fixtures = {
  ...MFSwitchFixtures,
  checkToken,
  getAuthFromToken,
  submitTwoFa,
}

const e = shouldUseFixtures ? fixtures : apis
export default e as typeof apis
