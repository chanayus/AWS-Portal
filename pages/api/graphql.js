import { ApolloServer, gql } from 'apollo-server-micro';
import schema from '../../apollo-server/src/graphql'

import '../../apollo-server/src/mongoose-connect'

export const config = {
  api: {
      bodyParser: false
  }
};

export default new ApolloServer({ schema, playground: true, introspection: true}).createHandler({ path: "/api/graphql" })
