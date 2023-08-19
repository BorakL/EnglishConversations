import Topic from "./../models/topicModel.js";
import { getOne, createOne, updateOne, deleteOne, getAll } from "./handlerFactory.js";

const setQuery = (req)=>{
    const query = {};
    if(req.query.title) query.title = {$regex: req.query.title.trim(), $options:"i"}
    return query;
}

export const getTopic = getOne(Topic)

export const createTopic = createOne(Topic)

export const updateTopic = updateOne(Topic)

export const deleteTopic = deleteOne(Topic)

export const getAllTopic = getAll(Topic, setQuery)