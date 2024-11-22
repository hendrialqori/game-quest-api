import { desc, eq, not } from "drizzle-orm";
import { db } from "../model/db.js";
import { users as usersTable } from "../model/schema.js";
import { mockSuccessResponse } from "../utils/mock.js";
import { validate } from "../validations/validator.js";
import { UserValidation } from "../validations/user-validation.js";
import { ResponseError } from "../utils/error.js";

import utc from "dayjs/plugin/utc.js"
import dayjs from "dayjs"
dayjs.extend(utc)

export default class UsersController {

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     * @param {import("express").NextFunction} next
     */

    static async leaderboard(_request, response, next) {
        try {
            // collecting top 10 user with ascending sort by point
            const result = await db
                .select()
                .from(usersTable)
                .orderBy(desc(usersTable.point))
                .where(not(eq(usersTable.point, 0)))
                .limit(10);

            const top_10 = await UsersController.top_10(result)

            // response
            return mockSuccessResponse(response, {
                status: 200,
                data: top_10,
                message: "Success"
            })

        } catch (error) {
            next(error)
        }
    }

    /**
    * @param {import("express").Request} req 
    * @param {import("express").Response} res
    * @param {import("express").NextFunction} next
    */

    static async add(req, res, next) {
        try {
            const body = req.body
            body.point = Number(body.point)

            // validator
            const { username, point } = validate(UserValidation.ADD, body)

            // payload
            const payload = {
                username, point,
                createdAt: dayjs().utc().toDate()
            }

            // insert payload into database
            await db.insert(usersTable).values(payload)
                .catch((error) => {
                    throw new ResponseError(400, error.message)
                })

            // response
            return mockSuccessResponse(res, {
                status: 200,
                message: "Success add user point"
            })

        } catch (error) {
            next(error)
        }
    }

    /**
     * @param {Object[]} data 
     * @returns {Promise<Object[]>}
     */
    static async top_10(data) {
        const temp = data
        const null_data = Array.from({ length: 10 - temp.length }).fill({
            id: null,
            username: null,
            point: null,
            createdAt: null
        })

        return [...temp, ...null_data]
    }
}