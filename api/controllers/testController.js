import catchAsync from "../utils/catchAsync.js";
import Test from "./../models/testModel.js";
import { getOne, createOne, updateOne, deleteOne, getAll } from "./handlerFactory.js";

export const setUserConversationId = (req,res,next)=>{
    if(!req.body.user){req.body.user = req.user.id}
    if(!req.body.conversation){req.body.conversation = req.params.conversationId}
    next();
}

const setQuery = (req)=>{
    const query={}
    if(req.query.result){
        query.result = req.query.result*1
    }else if(req.query.result_lt){
        query.result = {$lt: req.query.result_lt*1}
    }else if(req.query.result_gt){
        query.result = {$gt: req.query.result_gt*1}
    }
    return query
}

export const getTest = getOne(Test)

export const createTest = createOne(Test)

export const updateTest = updateOne(Test)

export const deleteTest = deleteOne(Test)

export const getAllTests = getAll(Test, setQuery)

export const getResults = catchAsync(async(req,res,next)=>{
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 12;
    try{
        const data = await Test.aggregate([
            {
                $group: {
                    _id:"$user",
                    totalTests:{$sum:1},
                    totalPoints:{$sum:"$result"}
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as:"user"
                }
            },
            {
                $unwind: {
                    path: "$user"
                }
            },
            {
                $project: {
                    _id:1,
                    totalTests: 1,
                    totalPoints: 1,
                    averagePoints: {$divide: ["$totalPoints","$totalTests"]},
                    user:{
                        name:"$user.name"
                    }
                }
            },
            {
                $sort: {
                    totalPoints:-1,
                    averagePoints:-1
                }
            },
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: limit }
                    ],
                    totalCount: [
                        {$count:"count"}
                    ]
                }
            }
        ])
        res.status(200).json({
            status:"success",
            data
        })
    }catch(error){
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }

})