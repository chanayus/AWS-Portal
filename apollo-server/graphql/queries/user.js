import { UserTC, UserModel, IAMUserTC, IAMUserModel } from '../../models'

export const users = UserTC.getResolver('findMany')
export const IAMUsers = IAMUserTC.getResolver('findMany')