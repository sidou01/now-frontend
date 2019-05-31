import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import createClient from './ApolloClient'

const setupAndRender = async () => {
  const client = await createClient()
  ReactDOM.render(<App client={client} />, document.getElementById('root'))
}

setupAndRender()
