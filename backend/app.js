import express from "express"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import cors from "cors"
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
});

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "/tmp/",
    }) 
    )

//routes import
import { router as userRouter } from './src/routes/user.routes.js'
import { router as videoRouter } from './src/routes/video.routes.js'


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v2", videoRouter)

// http://localhost:8000/api/v1/users/register
// http://localhost:8000/api/v2

export { app }