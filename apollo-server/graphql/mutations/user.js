import { UserTC, UserModel } from '../../models'

export const createUser = UserTC.getResolver('createOne')

export const removeUserById = UserTC.getResolver('removeById')