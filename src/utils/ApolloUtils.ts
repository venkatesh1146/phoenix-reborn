import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  gql,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import StorageUtils from './StorageUtils'

import { StorageConstants } from '~/constants'
import UrlConstants from '~/constants/UrlConstants'

const httpLink = createHttpLink({
  uri: UrlConstants.GRAPH_END_POINT,
})

const authLink = setContext((_, { headers }) => {
  const additionalHeaders = {}

  const rsessionid = StorageUtils.getGlobalCookie(
    StorageConstants.RSESSIONID_KEY
  )
  additionalHeaders['Authorization'] =
    '2a1b5fc8-2af7-4072-8c82-4cf14b8442e7:Nv95pHLzi4UtZPKXAEleRN0VQ'
  // StorageUtils.getProposalAccessToken() || StorageUtils.getAccessToken()
  additionalHeaders['X-RSESSIONID'] = rsessionid
  additionalHeaders['X-APP-VERSION'] = 'web'

  return {
    headers: {
      ...headers,
      ...additionalHeaders,
    },
  }
})

const WealthyApolloClient = new ApolloClient({
  uri: UrlConstants.GRAPH_END_POINT,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  // dataIdFromObject: (o: any) => o.id,
})

export default WealthyApolloClient
