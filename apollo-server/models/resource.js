import mongoose from 'mongoose'
import { SchemaComposer } from 'graphql-compose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose
const gqlSchemaComposer = new SchemaComposer()

const ResourceSchema = new Schema({
    resourceARN: { type: String, required: true },
    createdAt: { type: Date, required: true, index: true },
    userId: { type: String, require: true, ref: 'User' }
})

export const ResourceMoel = mongoose.models.Resource || mongoose.model('Resource', ResourceSchema)

export const ResourceTC = composeWithMongoose(ResourceMoel, { schemaComposer: gqlSchemaComposer })

export default ResourceMoel