import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})

const Topic = mongoose.model("Topic", topicSchema)

export default  Topic