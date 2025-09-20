import { Hono } from 'hono'
import type { Context } from 'hono'
import { successResponse, errorResponse } from '../middlewares/response.js'


export const login = async (c: Context) => {
    try {
        const { username, password } = await c.req.json()
        if (!username || !password) {
            return errorResponse(c, null, 400, 'Username and password are required')
        }
        return successResponse(c, { username, password }, 200, 'Login successful')
    } catch (error) {
        return errorResponse(c, error, 500, 'Internal server error')
    }
}