import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { Router } from '@reach/router'
import createClient from './ApolloClient'
import LoginPage from './pages/loginPage'

//add reach/router routes

const client = createClient()

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Router>
        <App path="/" />
        <LoginPage path="/login" />
      </Router>
    </ApolloHooksProvider>
    ,
  </ApolloProvider>,
  document.getElementById('root'),
)
