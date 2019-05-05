import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { typeDefs } from './localStateSchema'

const createClient = () => {
  const cache = new InMemoryCache()

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
      uri: `ws://localhost:4000/graphql`,
      options: {
        reconnect: true,
      },
    }),
  ])

  const httpLink = ApolloLink.from([
    errorLink,
    new HttpLink({
      uri: 'http://localhost:4000/graphql',
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
  })

  client.writeData({
    data: {
      isLoggedIn: false,
    },
  })
  return client
}

export default createClient
