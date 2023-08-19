import Test from "../models/testModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import { deleteOne, getOne, updateOne, getAll } from "./handlerFactory.js";

//filter parameters in object
export const filterObj = (obj, ...allowedFields) =>{
    const newObj={};
    Object.keys(obj).forEach(k => {
        if(!allowedFields.includes(k)){newObj[k] = obj[k] }  
    })
    return newObj;   
}

export const updateMe = async (req,res) => {
    try{
        if(req.body.password || req.body.passwordConfirm){
            throw new Error("This route is not for password updates. Please use /updatePassword")
        }
        const filterBody = filterObj(req.body, "name", "email");
        const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status:"success",
            data: {
                user: updateUser
            }
        })
    }catch(error){
        res.status(404).json({
            status:"fail",
            message: error
        })
    }
}

export const deleteMe = async (req,res) => {
    try{
        await User.findByIdAndDelete(req.user.id)
        res.status(204).json({
            status: "success",
            data: undefined
        })
    }catch(error){
        res.status(404).json({
            status: "fail",
            message: error
        })
    }
}

export const createUser = (req,res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not defined! Please use /signup instead"
    })
}

export const getUser = getOne(User)

export const updateUser = updateOne(User)

export const deleteUser = deleteOne(User)

export const getAllUsers = getAll(User)

export const setUserResults = async(req,res,next)=>{
    try{
        const results =  await Test.aggregate([
            {$match: {"user": new mongoose.Types.ObjectId(req.user.id)}},
            {$sort: {"date":-1}},
            {$group: {_id: "$conversation", latest: {$first: "$$ROOT"} }},
            {$project: {conversation:"$latest.conversation", result:"$latest.result"}}
        ])
        // const cookiesOptions = {
        //     expires: new Date(new Date() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000)
        // }
        res.cookie("results",JSON.stringify(results),{maxAge:360000})
        next();
    }catch(error){
        console.log(error.message)
    }
}
// db.test.aggregate([
//     { $sort: { "date": -1 } },
//     { $group: { _id: "$type", latest: { $first: "$$ROOT" } }},
//     { $project : {_id : 0, id : "$latest.id", type : "$latest.type", date : "$latest.date", firstName : "$latest.firstName", lastName : "$latest.lastName", }},
//     { $sort: { "type": 1 } }
// ])