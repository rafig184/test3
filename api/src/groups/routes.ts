
import express from "express"
import { getAllGroups } from "./handlers"

const groupsRouter = express.Router()

groupsRouter.get("/", async function (req, res, next) {
    try {
        const result = await getAllGroups()
        return res.json(result)
    } catch (error) {
        console.log(error);
        return next(error)
    }
})



export { groupsRouter }