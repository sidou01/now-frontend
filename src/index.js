import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { Query } from 'react-apollo'
import createClient from './ApolloClient'
import LoginPage from './pages/loginPage'
import gql from 'graphql-tag'

//add reach/router routes

const client = createClient()
const FETCH_AUTH_STATUS = gql`
  query fetchAuthStatus {
    isLoggedIn @client
  }
`

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Query query={FETCH_AUTH_STATUS}>
        {({ data }) => {
          return data.isLoggedIn ? <App /> : <LoginPage />
        }}
      </Query>
    </ApolloHooksProvider>
    ,
  </ApolloProvider>,
  document.getElementById('root'),
)
