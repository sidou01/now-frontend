import gql from 'graphql-tag'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    authenticatedUser: User!
  }

  enum Gender {
    MALE
    FEMALE
  }
`
