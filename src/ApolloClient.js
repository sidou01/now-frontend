import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { typeDefs } from './localStateSchema'
import { persistCache } from 'apollo-cache-persist'

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragmentTypes.json'

const createClient = async () => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  })
  const cache = new InMemoryCache({ fragmentMatcher })

  await persistCache({
    cache,
    storage: window.localStorage,
  })

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`),
      )
    }

    if (networkError) {
      console.log(
        `[Network error ${operation.operationName}]: ${networkError.message}`,
      )
    }
  })
  const wsLink = ApolloLink.from([
    errorLink,
    new WebSocketLink({
      uri: 'ws://ec2-3-93-13-29.compute-1.amazonaws.com:4000/graphql',
      options: {
        reconnect: true,
      },
    }),
  ])

  const httpLink = ApolloLink.from([
    errorLink,
    new HttpLink({
      uri: 'http://ec2-3-93-13-29.compute-1.amazonaws.com:4000/graphql',
      headers: {
        authorization: localStorage.getItem('authToken'),
      },
    }),
  ])

  const client = new ApolloClient({
    cache,
    link: split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      httpLink,
    ),
    typeDefs,
    resolvers: {},
  })

  cache.writeData({
    data: {
      isLoggedIn: !!localStorage.getItem('authToken'),
    },
  })
  return client
}

export default createClient
