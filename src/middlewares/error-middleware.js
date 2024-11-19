import { ResponseError } from "../utils/error.js";
import { mockErrorResponse } from "../utils/mock.js";
import { ZodError } from "zod"

/** 
 * @param {ResponseError} error 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {import("express").NextFunction} next 
 */


export function errorMiddleware(error, _request, response, _next) {
    if (error instanceof ZodError) {
        mockErrorResponse(response, {
            status: error.status,
            message: error.flatten().fieldErrors
        })

    } else if (error instanceof ResponseError) {
        mockErrorResponse(response, {
            status: error.status,
            message: error.message
        })

    } else {
        mockErrorResponse(response, {
            status: 500,
            message: error.message
        })
    }


}