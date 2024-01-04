import mongoose from "mongoose";
import Conversation from "./../models/conversationModel.js";
import { getOne, createOne, updateOne, deleteOne, getAll } from "./handlerFactory.js";
import catchAsync from "../utils/catchAsync.js";

export const setUser = (req,res,next)=>{
    if(!req.body.user){req.body.user = req.user.id}
    next()
}

export const getConversation = getOne(Conversation)

export const createConversation = createOne(Conversation)

export const updateConversation = updateOne(Conversation)

export const deleteConversation = deleteOne(Conversation)

export const getAllConversations = catchAsync(async(req,res,next)=>{
    const query = {}
    if(req.query.title) query.title = {$regex: req.query.title.trim(), $options:"i"}
    if(req.params.topicId) query.topic = new mongoose.Types.ObjectId(req.params.topicId)
    const sort = {};
    if(req.query.sort){
        const sortBy = req.query.sort.trim();
        sortBy.startsWith("-") ? sort[sortBy.slice(1)]=-1 : sort[sortBy]=1 
    }else{
        sort["_id"]=1
    }
    let limit = req.query.limit*1 || 12;
    let skip = req.query.skip*1 || 0; 
    const data = await Conversation.aggregate([
        {
            $facet: {
                docs: [
                    {$match: query},
                    {
                        $lookup: {
                            "from":"topics",
                            "localField": "topic",
                            "foreignField": "_id",
                            "as":"topic"
                        },
                    },
                    {$unwind: "$topic"},
                    {$sort: sort},
                    {$skip: skip},
                    {$limit: limit}
                ],
                total: [
                    {$match: query},
                    {$count: "count"}
                ]
            }
        }
    ])
    res.status(200).json({
        status: "success",
        data: data[0].docs,
        total: data[0].total.length>0 ? data[0].total[0].count : 0
    })
})