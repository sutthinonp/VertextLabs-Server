import type { Context, Next } from 'hono'
import jwt from 'jsonwebtoken'
import { errorResponse } from './response.js'
import type { User } from '../models/user.model.js'

export const generateToken = (user: User): string => {
    const jwtSecret = process.env.JWT_SECRET || 'default-secret-key'

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        jwtSecret,
        {
            expiresIn: '24h'
        }
    )

    return token
}

interface DecodedJWT {
    id: string
    username: string
    role: string
    iat?: number
    exp?: number
}

export const verifyToken = (token: string): DecodedJWT | null => {
    try {
        const jwtSecret = process.env.JWT_SECRET || 'default-secret-key'

        return jwt.verify(token, jwtSecret) as DecodedJWT
    } catch (error) {
        return null
    }
}

export const authMiddleware = async (c: Context, next: Next) => {
    try {
        const authHeader = c.req.header('Authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return errorResponse(c, null, 401, 'Authorization token required')
        }

        const token = authHeader.substring(7)

        const decoded = verifyToken(token)

        if (!decoded) {
            return errorResponse(c, null, 401, 'Invalid or expired token')
        }

        c.set('user', decoded)

        await next()

    } catch (error) {
        return errorResponse(c, null, 401, 'Authentication failed')
    }
}