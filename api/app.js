import express from "express";
import topicRouter from "./routes/topicRouter.js";
import conversationRouter from "./routes/conversationRouter.js";
import userRouter from "./routes/userRouter.js";
import testRouter from "./routes/testRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from 'path'
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(cors({origin: 'http://localhost:3000'}))

app.use("/api/v1/users", userRouter)
app.use("/api/v1/topics", topicRouter)
app.use("/api/v1/conversations", conversationRouter)
app.use("/api/v1/tests", testRouter)

app.use("*", (req,res)=>{  
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.use((err,req,res,next)=>{
    res.status(404).json({
        status:"fail",
        message:err.message
    })
})

export default app;