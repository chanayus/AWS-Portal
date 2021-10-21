import { ApolloServer, gql } from 'apollo-server-micro';
import schema from '../../apollo-server/graphql'

import '../../apollo-server/mongoose-connect'

const typeDefs = gql`
  type Query {
    hello: String
    users: [User]!
  }
  type Mutation {
    addUser(user: UserInput!): User
  }
  type User {
    username: String!
    role: UserRole!
  }
  enum UserRole {
    ADMIN
    CUSTOMER
  }
  input UserInput {
    username: String!
    role: String!
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    users: () => [
        {
            username: 'admin',
            role: 'ADMIN',
        },
        {
            username: 'alice',
            role: 'CUSTOMER',
        },
        {
            username: 'bob',
            role: 'CUSTOMER',
        },
    ],
  },
  Mutation: {
    addUser: (parent, args, context, info) => {
        const { user } = args
        console.log(user)
        return user
    },
  },
}

export const config = {
  api: {
      bodyParser: false
  }
};

export default new ApolloServer({ schema, playground: true, }).createHandler({ path: "/api/graphql" })
