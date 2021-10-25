import express from 'express'
import { ApolloServer } from 'apollo-server-express'
// import jwt from 'express-jwt'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import './mongoose-connect'

import schema from './graphql'

const path = '/graphql'
const server = new ApolloServer({
    schema,
    // introspection: true,
    playground: true,
    context: ({ req }) => ({ user: req.user }),
})

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

server.applyMiddleware({ app, path})

app.listen({ port: 3001 }, () => {
    console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`)
})