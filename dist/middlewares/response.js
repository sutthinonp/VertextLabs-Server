export const successResponse = (c, data, statusCode, message) => {
    const response = {
        status: 'success',
        message,
    };
    if (data !== null && data !== undefined) {
        response.data = data;
    }
    return c.json(response, statusCode);
};
export const errorResponse = (c, error, statusCode, message) => {
    const response = {
        status: 'error',
        message,
    };
    if (error !== null && error !== undefined) {
        response.error = error;
    }
    return c.json(response, statusCode);
};
