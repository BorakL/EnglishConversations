import mongoose from "mongoose";
import Conversation from "./../models/conversationModel.js";
import { getOne, createOne, updateOne, deleteOne, getAll } from "./handlerFactory.js";
import setSort from "../utils/setSort.js";

export const setUser = (req,res,next)=>{
    if(!req.body.user){req.body.user = req.user.id}
    next()
}

const setQuery = (req)=>{
    const query = {}
    if(req.query.title) query.title = {$regex: req.query.title.trim(), $options:"i"}
    if(req.params.topicId) query.topic = new mongoose.Types.ObjectId(req.params.topicId)
    return query
}

export const getConversation = getOne(Conversation)

export const createConversation = createOne(Conversation)

export const updateConversation = updateOne(Conversation)

export const deleteConversation = deleteOne(Conversation)

export const getAllConversations = getAll(Conversation, setQuery, setSort)