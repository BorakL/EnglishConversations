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