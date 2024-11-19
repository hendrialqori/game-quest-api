import express from "express"
import UsersController from "../controllers/users-controller.js"

export const apiRouter = express.Router()

/**
 * @param {string} path 
 * @returns {string}
 */
const route = (path) => "/api/v1" + path

apiRouter.get(route("/leaderboard"), UsersController.leaderboard)
apiRouter.post(route("/add-user-point"), UsersController.add)