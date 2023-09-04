import mongoose from "mongoose";
import fs from "fs";
import Conversation from "../models/conversationModel.js";
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config({ path:'./../config.env' })

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(()=>console.log("DB connection successful"))

//READ JSON FILE
const conversations = JSON.parse(fs.readFileSync(`${__dirname}/conversations.json`, "utf-8" ))
// const topics = JSON.parse(fs.readFileSync(`${__dirname}/topics.json`,"utf-8"))

//IMPORT DATA INTO DB

const importData = async ()=>{
    try{
        await Conversation.create(conversations,{validationBeforeSave:false})
    }catch(error){
        console.log(error)
    }
    process.exit();
}

const deleteData = async ()=>{
    try{
        await Conversation.deleteMany()
    }catch(error){
        console.log(error)
    }
    process.exit();
}

if(process.argv[2]==='--import'){
    importData();
}else if (process.argv[2] === '--delete'){
    deleteData();
}

//terminate batch job, then run this file with --import or --delete command at the end od state.
//example: node import-dev-data.js "--import"