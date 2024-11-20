import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import { errorMiddleware } from "./src/middlewares/error-middleware.js";
import { apiRouter } from "./src/route/index.js";

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

// setting cors
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"]
}))

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

app.use(express.json());

// ping
app.get("/", (req, res) => {
    res.status(200).send({ message: "PING!", date: new Date() })
})

app.use(express.urlencoded({ extended: false }));

app.use(apiRouter)

app.use(errorMiddleware)

app.listen(PORT, () => console.log(`[Server]: Server is running at http://localhost:${PORT}`))