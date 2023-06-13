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
    'cbe29ec5-13a3-4b55-9ec6-8b453c93ef96:d8hOWkQK5kBrSTBxUKDa0kkXy'
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
