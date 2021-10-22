import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import { SchemaComposer } from 'graphql-compose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose
const gqlSchemaComposer = new SchemaComposer()

const UserSchema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, require: true, bcrypt: true },
  isAdmin: {type: Boolean, require: true, default: false}
})

UserSchema.plugin(bcrypt)

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)

export const UserTC = composeWithMongoose(UserModel, { schemaComposer: gqlSchemaComposer }).removeField('password')

export default UserModel