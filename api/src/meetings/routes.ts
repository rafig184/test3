
import express, { NextFunction, Request, Response } from "express"
import zod from "zod"
import { getAllMeetings } from "./handlers/getAllMeeting"
import { getMeetingSearch } from "./handlers/searchMeeting"
import { addMeeting } from "./handlers/addMeeting"
import { log } from "winston"



const meetingsRouter = express.Router()

export const newMeetingSchema = zod.object({
    groupName: zod.string(),
    startDate: zod.string(),
    endDate: zod.string(),
    meetingInfo: zod.string(),
    meetingRoom: zod.string()
})


function middlewareNewMeeting(req: Request, res: Response, next: NextFunction) {
    try {
        newMeetingSchema.parse(req.body)
        console.log(req.body);
        return next()
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

meetingsRouter.post("/new-meeting", middlewareNewMeeting, async function (req, res, next) {
    try {
        const result = await addMeeting(req.body)
        console.log(result)
        return res.json({ message: "Meeting successfully added!" })
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

meetingsRouter.get("/search", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const groupName = req.query.q
        const result = await getMeetingSearch(groupName)
        return res.json(result)
    } catch (error) {
        console.log(error);
        return next(error)
    }
})


meetingsRouter.get("/", async function (req, res, next) {
    try {
        const result = await getAllMeetings()
        console.log(result);

        return res.json(result)
    } catch (error) {
        console.log(error);
        return next(error)
    }
})


export { meetingsRouter }