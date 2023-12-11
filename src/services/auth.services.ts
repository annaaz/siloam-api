import UserType from '../types/user.type'
import UserModel from '../model/user.model'
import { logger } from '../utils/logger'

export const createUser = async (payload: UserType) => {
    try {
        return await UserModel.create(
            {
                user_id: payload.user_id,
                email: payload.email,
                name: payload.name,
                password: payload.password,
                role: payload.role
            }
        )
    } catch (error) {
        logger.error('Error creating user:', error)
        throw new Error('Failed to create user')
    }
}

export const findUserByEmail = async (email: string) => {
    try {
        return await UserModel.findOne({ where: { email } })
    } catch (error) {
        logger.error(`Error finding user by email ${email}:`, error)
        throw new Error('Failed to find user by email')
    }
}
