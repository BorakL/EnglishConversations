import User from "./../models/userModel.js";
import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import Test from "../models/testModel.js";
import mongoose from "mongoose";

export const restrictTo = (...roles)=>{
    return (req,res,next)=>{
        console.log(req.user)
        if(!roles.includes(req.user.role)){
            throw new Error('You do not have permission to perform this action')
        }
        next();
    }
}

const signToken = id=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const cookiesOptions = {
        expires: new Date(new Date() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly: true
    }
    if(process.env.NODE_ENV==='production') cookiesOptions.secure = true
    user.password = undefined;
    res.cookie('jwt', token, cookiesOptions)
    res.status(statusCode).json({
        status:"success",
        token,
        user
    }) 
}

export const signup = async (req,res)=>{
    try{
        const {name,email,password,passwordConfirm} = req.body 
        const newUser = await User.create({
            name,
            email,
            password,
            passwordConfirm
        })
        createSendToken(newUser,201,res)
    }catch(error){
        res.status(404).json({
            status:"fail",
            message: error.message
        })
    }
}

export const login = async (req,res,next) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            throw new Error("Please provide email and password")
        }
        const user = await User.findOne({email}).select('+password')
        if(!user || !(await user.correctPassword(password, user.password))) {
            throw new Error("Incorrect email and password")
        }
        const results =  await Test.aggregate([
            {$match: {"user": new mongoose.Types.ObjectId(user.id)}},
            {$sort: {"date":-1}},
            {$group: {_id: "$conversation", latest: {$first: "$$ROOT"} }},
            {$project: {conversation:"$latest.conversation", result:"$latest.result"}}
        ])
        res.cookie('results', JSON.stringify(results), {maxAge:360000} )
        createSendToken(user,200,res)
    }catch(error){
        res.status(404).json({
            status:"fail",
            message: error.message
        })
    }
}

export const protect = async (req,res,next)=>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){ 
            token = req.headers.authorization.split(" ")[1]
        }
        if(!token){
            throw new Error("You are not logged in! Please log in to get access")
        }
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
        const currentUser = await User.findById(decoded.id);
        if(!currentUser){
            throw new Error("The user belonging to this token does no longer exist.")
        }
        req.user = currentUser;
        next();
    }catch(error){
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}