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
    '1e41eff5-6ce0-49d1-92c5-8e6adef5614a:ZbVTFULvGLov9ovH56BomDOhd'
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
