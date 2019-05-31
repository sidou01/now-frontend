import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import LoginPage from './pages/auth'
import gql from 'graphql-tag'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'

const FETCH_AUTH_STATUS = gql`
  query fetchAuthStatus {
    isLoggedIn @client
    authenticatedUser @client {
      fullName
      email
      avatar
    }
  }
`

const Dashboard = React.lazy(() => import('./pages/dashboard'))

export default ({ client }) => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Query query={FETCH_AUTH_STATUS}>
        {({ data }) => {
          return data.isLoggedIn ? (
            <React.Suspense fallback={<h2>loading...</h2>}>
              <Dashboard authUser={data.authenticatedUser} />
            </React.Suspense>
          ) : (
            <LoginPage />
          )
        }}
      </Query>
    </ApolloHooksProvider>
  </ApolloProvider>
)
