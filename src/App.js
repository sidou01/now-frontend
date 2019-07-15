import React, { useState } from "react"
import { ApolloProvider } from "react-apollo"
import { Query } from "react-apollo"
import LoginPage from "./pages/auth"
import gql from "graphql-tag"
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks"

// const Dashboard = React.lazy(() => import('./pages/dashboard'))
import Dashboard from "./pages/dashboard"

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

export default ({ client }) => {
  const token = window.localStorage.getItem("authToken")
  // if (token)
  //   return (
  //     <ApolloProvider client={client}>
  //       <ApolloHooksProvider client={client}>
  //         <Query query={FETCH_AUTH_STATUS}>
  //           {({ data }) => (
  //             <React.Suspense fallback={<h2>loading...</h2>}>
  //               <Dashboard authUser={data.authenticatedUser} />
  //             </React.Suspense>
  //           )}
  //         </Query>
  //       </ApolloHooksProvider>
  //     </ApolloProvider>
  //   )
  // else {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Dashboard />
      </ApolloHooksProvider>
    </ApolloProvider>
  )
  // }
}
