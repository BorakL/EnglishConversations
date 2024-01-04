import catchAsync from "../utils/catchAsync.js";
import Topic from "./../models/topicModel.js";
import { getOne, createOne, updateOne, deleteOne, getAll } from "./handlerFactory.js";

const setQuery = (req)=>{
    const query = {};
    if(req.query.title) query.title = {$regex: req.query.title.trim(), $options:"i"}
    return query;
}

const lookup = {
    "from": "conversations",
    "localField":"_id",
    "foreignField": "topic",
    "as":"conversation"
}

const unwind = "$conversation"

export const getTopic = getOne(Topic)

export const createTopic = createOne(Topic)

export const updateTopic = updateOne(Topic)

export const deleteTopic = deleteOne(Topic)

// export const getAllTopic = getAll(Topic, setQuery)

export const getAllTopic = catchAsync(async(req,res,next) => {
    const query = {};
    if(req.query.title) query.title = {$regex: req.query.title.trim(), $options:"i"}
    const sort = {};
    if(req.query.sort){
        const sortBy = req.query.sort.trim();
        sortBy.startsWith("-") ? sort[sortBy.slice(1)]=-1 : sort[sortBy]=1
    }else{
        sort["_id"]=1
    }
    let limit = req.query.limit*1 || 12;
    let skip = req.query.skip*1 || 0;

    let data = await Topic.aggregate([
        {
            $facet: {
                docs: [
                    {
                        $match: query
                    },
                    {
                        $lookup: {
                            "from": 'conversations',
                            "foreignField": 'topic',
                            "localField": '_id',
                            "as": 'topics'
                        }
                    },
                    {
                        $project: {
                            title: 1,
                            conversationCount: {$size: '$topics'}
                        }
                    },
                    { $sort: sort },
                    { $skip: skip },
                    { $limit: limit }                    
                ],
                total: [
                    {$count: "count"}
                ]
            }
        }
    ])
    res.status(200).json( {
        status: "success",
        data: data[0].docs,
        total: data[0].total.length>0 ? data[0].total[0].count : 0
    })
})