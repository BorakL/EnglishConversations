import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./../app.js";

dotenv.config({path:'./config.env'})
 

const DB = process.env.DATABASE
mongoose.connect(DB,{
  useNewUrlParser: "true",
  useUnifiedTopology: "true"
  }).then(()=>console.log("DB connection successful!"))

const port = 8000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}...`)
})