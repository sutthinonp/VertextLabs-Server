import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const successResponse = (c: Context, data: any, statusCode: number, message: string) => {
    const response: any = {
        status: 'success',
        message,
    }

    if (data !== null && data !== undefined) {
        response.data = data
    }

    return c.json(response, statusCode as ContentfulStatusCode)
}
export const errorResponse = (c: Context, error: any, statusCode: number, message: string) => {
    const response: any = {
        status: 'error',
        message,
    }

    if (error !== null && error !== undefined) {
        response.error = error
    }

    return c.json(response, statusCode as ContentfulStatusCode)
}
