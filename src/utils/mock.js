/**
 * @param {import("express").Request} res 
 * @param {Object} body
 * @param {number} body.status
 * @param {Object[]} body.data
 * @param {string} body.message
 * @returns {import("express").Response}
 */

export function mockSuccessResponse(res, body) {
    return res.status(body.status).send(body)
}

/**
 * @param {import("express").Response} res 
 * @param {Object} error 
 * @param {number} error.status
 * @param {string} error.message
 * @returns {import("express").Response}
 */

export function mockErrorResponse(res, error) {
    return res.status(error.status).send(error)
}
