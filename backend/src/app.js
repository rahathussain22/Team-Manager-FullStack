import express from "express"
import cors from "cors"
import CookieParser from "cookie-parser"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

export default app