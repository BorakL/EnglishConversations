import mongoose from "mongoose";
import { phraseSchema } from "./phraseModel.js";

const conversationSchema = new mongoose.Schema({
    conversation: {
        type: [phraseSchema],
        required: [true, "Conversation is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    topic: {
        type: mongoose.Schema.ObjectId,
        ref: "Topic",
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

conversationSchema.pre(/^find/,function(){
    this.populate({
        path:"topic",
        select:"title"
    })
})

const Conversation = mongoose.model("Conversation", conversationSchema)

export default  Conversation