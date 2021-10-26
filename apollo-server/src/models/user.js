import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import { SchemaComposer } from 'graphql-compose'
import { composeWithMongoose, composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose
const gqlSchemaComposer = new SchemaComposer()

const enumUserType = {
  IAM_USER: "IAMUser",
  ROLE: "Role"
}

const UserSchema = new Schema({
  principalId: { type: String },
  username: { type: String, required: true, index: true, unique: true },
})

const IAMUserSchema = new Schema({
  password: { type: String, require: true, bcrypt: true },
  isAdmin: {type: Boolean, require: true, default: false}
})

const RoleUserSchema = new Schema({
  owner: {type: String, require: true, ref: 'IAMUser'}
})

IAMUserSchema.plugin(bcrypt)

UserSchema.set('discriminatorKey', 'type')

export const UserModel = mongoose.model('User', UserSchema)
export const IAMUserModel = UserModel.discriminator(enumUserType.IAM_USER, IAMUserSchema)
export const RoleUserModel = UserModel.discriminator(enumUserType.ROLE, RoleUserSchema)

export const UserTC = composeWithMongooseDiscriminators(UserModel)
export const IAMUserTC = UserTC.discriminator(IAMUserModel, { name: enumUserType.IAM_USER }).removeField('password')
export const RoleUserTC = UserTC.discriminator(RoleUserModel, { name: enumUserType.ROLE })

export default UserModel