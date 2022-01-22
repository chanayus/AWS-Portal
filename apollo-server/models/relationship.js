import mongoose from 'mongoose'
import { SchemaComposer } from 'graphql-compose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

// const enumRelationshipType = {
//     PARENT: "Parent",
//     ASSOCIATE: "Associate"
// }

const RelationshipSchema = new Schema({
    type: { type: String },
    resouresARN: { type: String },
    childResouresARN: { type: String }
})

export const RelationshipMoel = mongoose.model('Relationship', RelationshipSchema)

export const RelationshipTC = composeWithMongoose(RelationshipMoel)

export default RelationshipTC