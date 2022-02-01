import { ApolloClient, InMemoryCache } from "@apollo/client";
import dotenv from "dotenv"
dotenv.config()

const uri = process.env.AWS_PORTAL_APOLLO_END_POINT;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export default client;