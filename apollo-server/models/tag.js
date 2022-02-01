import mongoose from 'mongoose'
import { SchemaComposer } from 'graphql-compose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const tagSchema = new Schema({
    Key:  { type: String, index: true },
    Value: { type: String},
})

export const tagModel = mongoose.model('Tag', tagSchema)

export const tagTC = composeWithMongoose(tagModel)

export default tagModel