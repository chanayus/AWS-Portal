import { UserTC, UserModel, IAMUserTC } from '../../models'

export const createUser = UserTC.getResolver('createOne')
export const createIAMUser = IAMUserTC.getResolver('createOne')
export const removeUserById = UserTC.getResolver('removeById')