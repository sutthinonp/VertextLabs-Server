import type { Context } from 'hono'
import jwt from 'jsonwebtoken'
import { successResponse, errorResponse } from './response.js'

interface JwtPayload {
    id: string
    username: string
    role: string
}

export const generateToken = (user: JwtPayload): string => {
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

export const verifyToken = (token: string): any => {
    try {
        const jwtSecret = process.env.JWT_SECRET || 'default-secret-key'

        return jwt.verify(token, jwtSecret)
    } catch (error) {
        return null
    }
}

export const authMiddleware = async (c: Context, next: any) => {
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