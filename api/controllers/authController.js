import User from "./../models/userModel.js";
import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import catchAsync from "../utils/catchAsync.js";

export const restrictTo = (...roles)=>{
    return (req,res,next)=>{
        console.log(req.user)
        if(!roles.includes(req.user.role)){
            throw new Error('You do not have permission to perform this action')
        }
        next();
    }
}

const signToken = user=>{
    return jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user)
    const cookiesOptions = {
        expires: new Date(new Date() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly: true
    }
    if(process.env.NODE_ENV==='production') cookiesOptions.secure = true
    res.cookie('jwt', token, cookiesOptions)
    res.status(statusCode).json({
        status:"success",
        token,
        user
    }) 
} 

export const signup = catchAsync(async(req,res,next)=>{
    const{username,email,password,passwordConfirm} = req.body;
    const user = await User.create({
        username,
        email,
        password,
        passwordConfirm
    })
    user.password = undefined;
    createSendToken(user,201,res)
})


export const login = catchAsync(async(req,res,next)=>{
    const{email,password} = req.body;
    if(!email || !password){
        throw new Error("Please provide email and password")
    }
    const user = await User.findOne({email}).select("+password") 
    if(!user || !(await user.correctPassword(password,user.password))){ 
        throw new Error("Incorrect username or password.") 
    } 
    user.password = undefined;
    createSendToken(user,200,res)
})

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

export const authorization = (Model) => {
    return async(req,res,next)=>{
        try{
            const item = await Model.findById(req.params.id)
            if(item.user.toString()===req.user._id.toString()){
                next()
            }else{
                throw new Error("Forbidden: You are not the creator of this resource")
            }
        }catch(error){
            res.status(404).json({
                status:"fail",
                mesage: error.message
            })
        }
        
    }
}