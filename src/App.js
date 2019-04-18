import React from 'react'
import './App.css'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ApolloConsumer } from 'react-apollo'

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password })
  }
`
const App = () => {
  const user = {
    email: 'jeb27941@cndps.com',
    password: 'sidou123',
  }

  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={LOGIN}
          onCompleted={({ login }) => {
            localStorage.setItem('token', login)
            client.writeData({
              data: {
                isAuthenticated: true,
              },
            })
          }}>
          {(login, { data, loading, error }) => {
            if (error) return <p>error</p>
            if (loading) return <p>loading...</p>

            return (
              <div className="App">
                <header className="App-header">
                  <button onClick={() => login({ variables: user })}>
                    login
                  </button>
                  <p>login token is: {data && data.login}</p>
                </header>
              </div>
            )
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default App
