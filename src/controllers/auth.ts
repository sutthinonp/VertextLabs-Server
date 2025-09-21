import type { Context } from 'hono'
import { successResponse, errorResponse } from '../middlewares/response.js'
import { UserService } from '../services/user.js'
import { generateToken } from '../middlewares/auth.js'

export const login = async (c: Context) => {
    const userService = new UserService()

    try {
        const { username, password } = await c.req.json()

        if (!username || !password) {
            return errorResponse(c, null, 400, 'Username and password are required')
        }

        const user = await userService.findByUsername(username)
        if (!user) {
            return errorResponse(c, null, 401, 'Invalid username or password')
        }

        if (user.password !== password) {
            return errorResponse(c, null, 401, 'Invalid username or password')
        }

        const token = generateToken(user)

        const userResponse = {
            id: user.id,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        return successResponse(c, {
            token,
            user: userResponse
        }, 200, 'Login successful')

    } catch (error) {
        console.error('Login error:', error)
        return errorResponse(c, null, 500, 'Internal server error')
    }
}

export const logout = async (c: Context) => {
    try {
        return successResponse(c, null, 200, 'Logout successful')
    } catch (error) {
        return errorResponse(c, null, 500, 'Internal server error')
    }
}