interface AppEnvType {
  API_URL: string
  GATE_API_URL: string
  MOBILE_WEB_URL: string
  COOKIE_DOMAIN: string
  GRAPH_API_END_POINT: string
  LANDING_URL: string
  WEBSOCKET_API_END_POINT: string
  ENTREAT_API_URL: string
  PROPOSAL_API_URL: string
  GRAPH_CACHING_TIME: number
  QUIENJET_URL: string
  ADVISOR_API_URL: string
  TRACKER_CUSTOMER_API_URL: string
  HAGRID_EXTERNAL_URL: string
  ACTIONS_API_URL: string
  IS_PRODUCTION?: boolean
  IS_LOCAL?: boolean
}
let appEnv: AppEnvType

switch (process.env.NEXT_PUBLIC_WEALTHY_ENV) {
  case 'development':
    appEnv = {
      API_URL: 'https://app.wealthydev.in',
      GATE_API_URL: 'https://api.wealthydev.in',
      MOBILE_WEB_URL: 'https://m.wealthydev.in',
      COOKIE_DOMAIN: '.wealthydev.in',
      GRAPH_API_END_POINT: 'https://graph.wealthydev.in/',
      LANDING_URL: 'https://www.wealthydev.in',
      WEBSOCKET_API_END_POINT: 'wss://api.wealthydev.in',
      ENTREAT_API_URL: 'https://api.wealthydev.in/entreat-products',
      ADVISOR_API_URL:
        'https://api.wealthydev.in/taxy/external-apis/advisors/v0',
      PROPOSAL_API_URL: 'https://api.wealthydev.in/external-apis/v0/proposals',
      ACTIONS_API_URL:
        'https://api.wealthydev.in/hagrid/dashboard/external-actions',
      TRACKER_CUSTOMER_API_URL:
        'https://api.wealthydev.in/trak/customers/v0/mf-syncs',
      GRAPH_CACHING_TIME: 60000,
      HAGRID_EXTERNAL_URL:
        'https://api.wealthydev.in/hagrid/dashboards/external',
      QUIENJET_URL: 'https://api.wealthydev.in/quinjet',
    }
    break
  case 'production':
    appEnv = {
      API_URL: 'https://app.wealthy.in',
      GATE_API_URL: 'https://api.wealthy.in',
      IS_PRODUCTION: true,
      MOBILE_WEB_URL: 'https://m.wealthy.in',
      COOKIE_DOMAIN: '.wealthy.in',
      GRAPH_API_END_POINT: 'https://graph.wealthy.in/',
      LANDING_URL: 'https://www.wealthy.in',
      WEBSOCKET_API_END_POINT: 'wss://api.wealthy.in',
      ENTREAT_API_URL: 'https://api.wealthy.in/entreat-products',
      ADVISOR_API_URL: 'https://api.wealthy.in/taxy/external-apis/advisors/v0',
      PROPOSAL_API_URL: 'https://api.wealthy.in/external-apis/v0/proposals',
      ACTIONS_API_URL:
        'https://api.wealthy.in/hagrid/dashboard/external-actions',
      TRACKER_CUSTOMER_API_URL:
        'https://api.wealthy.in/trak/customers/v0/mf-syncs',
      GRAPH_CACHING_TIME: 900000,
      HAGRID_EXTERNAL_URL: 'https://api.wealthy.in/hagrid/dashboards/external',
      QUIENJET_URL: 'https://api.wealthy.in/quinjet',
    }
    break
  default:
    appEnv = {
      API_URL: 'https://app.wealthydev.in',
      GATE_API_URL: 'https://api.wealthydev.in',
      IS_LOCAL: true,
      MOBILE_WEB_URL: 'https://m.wealthydev.in',
      COOKIE_DOMAIN: 'localhost',
      GRAPH_API_END_POINT: 'https://graph.wealthydev.in/',
      LANDING_URL: 'https://www.wealthydev.in',
      WEBSOCKET_API_END_POINT: 'wss://api.wealthydev.in',
      ENTREAT_API_URL: 'https://api.wealthydev.in/entreat-products',
      ADVISOR_API_URL:
        'https://api.wealthydev.in/taxy/external-apis/advisors/v0',
      PROPOSAL_API_URL: 'https://api.wealthydev.in/external-apis/v0/proposals',
      ACTIONS_API_URL:
        'https://api.wealthydev.in/hagrid/dashboard/external-actions',
      TRACKER_CUSTOMER_API_URL:
        'https://api.wealthydev.in/trak/customers/v0/mf-syncs',
      GRAPH_CACHING_TIME: 60000,
      HAGRID_EXTERNAL_URL:
        'https://api.wealthydev.in/hagrid/dashboards/external',
      QUIENJET_URL: 'https://api.wealthydev.in/quinjet',
    }
}

export default appEnv
