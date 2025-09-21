import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

interface ApiResponse<T = any> {
    status: 'success' | 'error'
    message: string
    data?: T
    error?: any
}

export const successResponse = <T>(c: Context, data: T, statusCode: number, message: string) => {
    const response: ApiResponse<T> = {
        status: 'success',
        message,
    }

    if (data !== null && data !== undefined) {
        response.data = data
    }

    return c.json(response, statusCode as ContentfulStatusCode)
}
    
export const errorResponse = (c: Context, error: any, statusCode: number, message: string) => {
    const response: ApiResponse = {
        status: 'error',
        message,
    }

    if (error !== null && error !== undefined) {
        response.error = error
    }

    return c.json(response, statusCode as ContentfulStatusCode)
}
