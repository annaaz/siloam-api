import { Request, Response } from 'express'
import { createUserValidation } from '../validations/user.validation'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { checkPassword, hashing } from '../utils/hashing'
import { createUser, findUserByEmail } from '../services/auth.services'
import { createSessionValidation, refreshSessionValidation } from '../validations/auth.validation'
import { signJWT, verifyJWT } from '../utils/jwt'

export const registerUser = async (req: Request, res: Response) => {
    req.body.user_id = uuidv4()
    const { error, value } = createUserValidation(req.body)
    logger.info(value)
    if (error != null) {
        logger.error('ERR: Product - Create = ', error.details[0].message)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    }
    try {
        value.password = `${hashing(value.password)}`
        await createUser(value)
        res.status(201).json({ status: true, statusCode: 201, message: 'Success Register User' })
    } catch (error) {
        logger.error('ERR: Auth - Register = ', error)
        return res.status(422).send({ status: false, statusCode: 422, message: error })
    }
}
export const createSession = async (req: Request, res: Response) => {
    const { error, value } = createSessionValidation(req.body)

    if (error) {
        logger.error('ERR: Auth - Create Session = ', error.details[0].message)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    }

    try {
        const user: any = await findUserByEmail(value.email)
        const isValid = checkPassword(value.password, user.password)
        if (!isValid) {
            return res.status(401).json({ status: false, statusCode: 401, message: 'Invalid Email or Password ' })
        }
        const accessToken = signJWT({ ...user }, { expiresIn: '1s' })
        const refreshToken = signJWT({ ...user }, { expiresIn: '1y' })
        return res
            .status(200)
            .send({ status: true, statusCode: 200, message: 'Login Succes', data: { accessToken, refreshToken } })
    } catch (error: any) {
        logger.error('ERR: Auth - Create Session = ', error.message)
        return res.status(422).send({ status: false, statusCode: 422, message: error.message })
    }
}

export const refreshSession = async (req: Request, res: Response) => {
    const { error, value } = refreshSessionValidation(req.body)

    if (error) {
        logger.error('ERR: Auth - Refresh Session = ', error.details[0].message)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    }
    try {
        const { decoded } = verifyJWT(value.refreshToken)
        console.log({ value })
        const user = await findUserByEmail(decoded._doc.email)
        if (!user) return false
        const accessToken = signJWT(
            {
                ...user
            },
            { expiresIn: '1d' }
        )
        return res
            .status(200)
            .send({ status: true, statusCode: 200, message: 'Refresh Session Succes', data: { accessToken } })
    } catch (error: any) {
        logger.error('ERR: Auth - Refresh Session = ', error.message)
        return res.status(422).send({ status: false, statusCode: 422, message: error.message })
    }
}
