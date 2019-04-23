import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ApolloProvider } from 'react-apollo'
import { Router } from '@reach/router'
import createClient from './ApolloClient'

//add reach/router routes

const client = createClient()

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App path="/" />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
