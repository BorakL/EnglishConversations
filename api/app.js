import express from "express";
import topicRouter from "./routes/topicRouter.js";
import conversationRouter from "./routes/conversationRouter.js";
import userRouter from "./routes/userRouter.js";
import testRouter from "./routes/testRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from 'path'
import { fileURLToPath } from "url";

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) 
const corsOptions = {
    //origin: 'http://localhost:3000',
    origin: process.env.ONRENDER_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'build'))); 
app.use(express.static(path.join(__dirname, 'public')))

app.use("/api/v1/users", userRouter)
app.use("/api/v1/topics", topicRouter)
app.use("/api/v1/conversations", conversationRouter)
app.use("/api/v1/tests", testRouter)

app.use("*", (req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})

app.use((err,req,res,next)=>{
    res.status(404).json({
        status:"fail",
        code: err.code, 
        message:err.message
    })
})

export default app;