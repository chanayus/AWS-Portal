import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const UserSchema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, require: true, bcrypt: true },
  isAdmin: {type: Boolean, require: true, default: false}
})

UserSchema.plugin(bcrypt)

export const UserModel = mongoose.model('User', UserSchema)

export const UserTC = composeWithMongoose(UserModel).removeField('password')

export default UserModel