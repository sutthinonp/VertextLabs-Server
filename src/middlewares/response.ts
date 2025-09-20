import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'


export const successResponse = (c: Context, data: any, statusCode: number, message: string) => {
    return c.json({
        status: 'success',
        data,
        message,
    }, statusCode as ContentfulStatusCode)
}

export const errorResponse = (c: Context, error: any, statusCode: number, message: string) => {
    return c.json({
        status: 'error',
        error,
        message,
    }, statusCode as ContentfulStatusCode)
}
