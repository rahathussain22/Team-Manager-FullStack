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

//Routes
import userRouter from "./routes/user.routes.js";
app.use("/user", userRouter);
export default app