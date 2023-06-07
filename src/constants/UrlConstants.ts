/* eslint-disable @typescript-eslint/no-unused-vars */
import appEnv from '~/utils/env'

const API_URL = appEnv.API_URL
const IS_PRODUCTION = appEnv.IS_PRODUCTION
const LANDING_URL = appEnv.LANDING_URL
const GATE_API_URL = appEnv.GATE_API_URL
const GRAPH_API_END_POINT = appEnv.GRAPH_API_END_POINT
const WEBSOCKET_API_URL = appEnv.WEBSOCKET_API_END_POINT

const GRAPH_END_POINT = `${GRAPH_API_END_POINT}graphql`
const GRAPH_SCHEMA = `${GRAPH_API_END_POINT}graphql/`

const AMC_BASE_URL = 'https://i.wlycdn.com/amc-logos/'
const WEALTHY_API_V0 = `${GATE_API_URL}/taxy/api/v0`
const TRACK_API_V0 = `${GATE_API_URL}/trak/api/v0`
const GOOGLE_LOGIN = `${API_URL}/api/social/login/google-oauth2`
const GOOGLE_LOGIN_URL = (o: {
  rsessionid: any
  referral_code: any
  payload_id: any
  date: any
  redirect_to: any
  anonid: any
  company_code: any
}) =>
  `${GOOGLE_LOGIN}?rsessionid=${o.rsessionid}&referral_code=${o.referral_code}&payload_id=${o.payload_id}&date=${o.date}&redirect_to=${o.redirect_to}&anonid=${o.anonid}&company_code=${o.company_code}`
const FACEBOOK_LOGIN = `${API_URL}/api/social/login/facebook`
const FACEBOOK_LOGIN_URL = (o: {
  rsessionid: any
  referral_code: any
  payload_id: any
  date: any
  redirect_to: any
  anonid: any
  company_code: any
}) =>
  `${FACEBOOK_LOGIN}?rsessionid=${o.rsessionid}&referral_code=${o.referral_code}&payload_id=${o.payload_id}&date=${o.date}&redirect_to=${o.redirect_to}&anonid=${o.anonid}&company_code=${o.company_code}`
const API_INIT = `${WEALTHY_API_V0}/init/`
const API_LOGIN = `${WEALTHY_API_V0}/login/`
const API_SIGNUP = `${WEALTHY_API_V0}/register/`
const API_FETCH_INTERNAL_TOKEN_DETAILS = `${
  IS_PRODUCTION ? GATE_API_URL : API_URL
}/wealthyauth/dashboard/fetch-internal-token-details/`
const API_RESET_PASSWORD = `${WEALTHY_API_V0}/new-password/`
const API_REMIND_PASSWORD = `${WEALTHY_API_V0}/forgot-password/`
const API_REFRESH_TOKEN = `${WEALTHY_API_V0}/refresh/`
const API_CHARTS_PPF_INDEX_URL = (step = 1, term = 3) =>
  `${WEALTHY_API_V0}/indexes/ppf/?step=${step}&term=${term}`
const API_CHARTS_FD_INDEX_URL = (step = 1, term = 3) =>
  `${WEALTHY_API_V0}/indexes/fd/?step=${step}&term=${term}`
const API_CHARTS_NIFTY_INDEX_URL = (
  subtype: any,
  step = 1,
  from = new Date('1/1/2001').valueOf(),
  to = new Date().valueOf()
) =>
  `${WEALTHY_API_V0}/indexes/nifty/?subtype=${subtype}&step=${step}&from=${from}&to=${to}`
const API_CHARTS_INDEX = `${WEALTHY_API_V0}/indexes/wealthy/`
const API_CHARTS_INDEX_URL = (
  subtype: any,
  step = 1,
  from = new Date('1/1/2001').valueOf(),
  to = new Date().valueOf()
) => `${API_CHARTS_INDEX}?subtype=${subtype}&step=${step}&from=${from}&to=${to}`
const API_CHARTS_GOAL = `${WEALTHY_API_V0}/graphs/goal/`
const API_CHARTS_OVERALL = `${WEALTHY_API_V0}/graphs/overall/`
const API_GOAL_SUBTYPES = `${WEALTHY_API_V0}/goal-subtypes/`
const API_MAKE_PURCHASE = `${WEALTHY_API_V0}/make-purchase/`
const API_CHECK_PURCHASE = `${WEALTHY_API_V0}/check-purchase/`
const API_GET_TERMS = `${WEALTHY_API_V0}/order/tc/`
const API_ACCEPT_TERMS = `${WEALTHY_API_V0}/order/agree-tc/`
const API_GET_ORDER_STATUS = `${WEALTHY_API_V0}/orders/`
const API_UPDATE_ORDER_STATUS = `${WEALTHY_API_V0}/update-order-status/`
const API_SAVE_ONBOARDING = `${WEALTHY_API_V0}/onboarding/save/`
const API_SAVE_GOAL = `${WEALTHY_API_V0}/goals/`
const API_SETUP_SIP = `${WEALTHY_API_V0}/sip/setup/`
const API_ONE_TIME_PAYMENT = `${WEALTHY_API_V0}/shortener/make-purchase/`
const API_ONE_TIME_PAYMENT_DATA = `${WEALTHY_API_V0}/shortener/payment-meta/`
const API_ONE_TIME_ORDER_DATA = `${WEALTHY_API_V0}/shortener/order-data/`
const API_ONE_TIME_UPDATE_ORDER_STATUS = `${WEALTHY_API_V0}/shortener/update-order-status/`
const API_SEND_ONE_TIME_PAYMENT_LINK = `${WEALTHY_API_V0}/send-payment-link/`
const API_INITIATE_OFFLINE_PAYMENT = `${WEALTHY_API_V0}/make-offline-purchase-request/`
const API_GET_FAQS_GI = `${LANDING_URL}/api/v0/faqs/?limit=100&tag=gi`
const API_GET_FAQS_TAX = `${LANDING_URL}/api/v0/faqs/?limit=100&tag=taxy`
const API_PRINT_RECEIPT_TOKEN = (orderId: any) =>
  `${WEALTHY_API_V0}/orders/${orderId}/receipt-token/`
const API_PRINT_RECEIPT = (orderId: any, token: any) =>
  `${WEALTHY_API_V0}/orders/${orderId}/receipt/?token=${token}`

const UrlConstants = {
  API_URL,
  IS_PRODUCTION,
  LANDING_URL,
  GATE_API_URL,
  GRAPH_API_END_POINT,
  WEBSOCKET_API_URL,
  GRAPH_END_POINT,
  GRAPH_SCHEMA,
  AMC_BASE_URL,
  WEALTHY_API_V0,
  TRACK_API_V0,
  GOOGLE_LOGIN,
  GOOGLE_LOGIN_URL,
  FACEBOOK_LOGIN,
  FACEBOOK_LOGIN_URL,
  API_INIT,
  API_LOGIN,
  API_SIGNUP,
  API_FETCH_INTERNAL_TOKEN_DETAILS,
  API_RESET_PASSWORD,
  API_REMIND_PASSWORD,
  API_REFRESH_TOKEN,
  API_CHARTS_PPF_INDEX_URL,
  API_CHARTS_FD_INDEX_URL,
  API_CHARTS_NIFTY_INDEX_URL,
  API_CHARTS_INDEX,
  API_CHARTS_INDEX_URL,
  API_CHARTS_GOAL,
  API_CHARTS_OVERALL,
  API_GOAL_SUBTYPES,
  API_MAKE_PURCHASE,
  API_CHECK_PURCHASE,
  API_GET_TERMS,
  API_ACCEPT_TERMS,
  API_GET_ORDER_STATUS,
  API_UPDATE_ORDER_STATUS,
  API_SAVE_ONBOARDING,
  API_SAVE_GOAL,
  API_SETUP_SIP,
  API_ONE_TIME_PAYMENT,
  API_ONE_TIME_PAYMENT_DATA,
  API_ONE_TIME_ORDER_DATA,
  API_ONE_TIME_UPDATE_ORDER_STATUS,
  API_SEND_ONE_TIME_PAYMENT_LINK,
  API_INITIATE_OFFLINE_PAYMENT,
  API_GET_FAQS_GI,
  API_GET_FAQS_TAX,
  API_PRINT_RECEIPT_TOKEN,
  API_PRINT_RECEIPT,
}
export default UrlConstants
