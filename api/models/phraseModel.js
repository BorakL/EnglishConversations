import mongoose from "mongoose";

export const phraseSchema = new mongoose.Schema({
    serb:{
        type: String,
        required: [true, "Serbian translation is required"]
    },
    eng:{
        type: String,
        required: [true, "English translation is required"]
    }
})