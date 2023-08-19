import mongoose from "mongoose";


const testSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    conversation: {
        type: mongoose.Schema.ObjectId,
        ref: "Conversation",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    result: {
        type: Number,
        required: true
    }
},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

// testSchema.virtual("increasedPoints").get(function(){
//     return this.points+100
// })

testSchema.pre(/^find/,function(next){
    this.populate({
        path: 'user'
    }).populate({
        path: 'conversation',
        select: 'title'
    })
    next();
})

// testSchema.post("save", async function(){
//     try{
//         await User.bulkWrite([
//             {
//                 updateOne: {
//                     "filter": {"_id": this.user, "results.conversation": this.conversation},
//                     "update": { $set: { "results.$.points": this.result } }
//                 }
//             },
//             {
//                 updateOne: {
//                     "filter": {"_id": this.user, "results.conversation": {$ne: this.conversation}},
//                     "update": {$push: {"results": {"conversation": this.conversation, "points": this.result}}}
//                 }
//             }
//         ])
//     }catch(error){
//         console.log("error",error.message)
//     } 
// })

const Test = mongoose.model("Test", testSchema)

export default  Test;