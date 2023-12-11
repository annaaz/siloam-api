import jwt from 'jsonwebtoken'
import config from '../config/environment'

export const signJWT = (payload: object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(payload, config.jwt_private, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export const verifyJWT = (token: string) => {
    try {
        const decoded: any = jwt.verify(token, config.jwt_public)
        return { valid: true, expired: false, decoded }
    } catch (error: any) {
        return { valid: false, expired: (error.message = 'jwt is expired or not eligeble to use'), decoded: null }
    }
}
