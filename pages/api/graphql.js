import { ApolloServer, gql } from 'apollo-server-micro';
import schema from '../../apollo-server/graphql'

import '../../apollo-server/mongoose-connect'

export const config = {
  api: {
      bodyParser: false
  }
};

export default new ApolloServer({ schema, playground: true, }).createHandler({ path: "/api/graphql" })
