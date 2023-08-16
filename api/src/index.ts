import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import { groupsRouter } from "./groups/routes";
import { meetingsRouter } from "./meetings/routes";




const port = 4000

const app = express();
app.use(cors())
app.use(express.json());

app.get("/health-check", function (req, res, next) {
    res.send(`API IS OK ${new Date().toISOString()}`)
})


app.use("/groups", groupsRouter)
app.use("/meetings", meetingsRouter)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log({ message: err.message })
    res.status(500).send({ message: err.message })
})


app.listen(port, () => {
    console.log({ message: `Api is running on Port ${port}` })
})