import Conversation from "../models/conversationModel.js";
import catchAsync from "../utils/catchAsync.js";


export const getPhrase = async(req,res)=>
  catchAsync(async(req,res)=>{
    const phrases = await Conversation.findById(req.params.conversationId)
    const indx = phrases.conversation.findIndex(p => p.id===req.params.id)
    if(indx<0){ 
      throw new Error("No phrase")
    }
    res.status(200).json({
      status:"success",
      phrase: phrases.conversation[indx]
    })
  })

export const createPhrase = catchAsync(async(req,res)=>{
  const newPhrase = await Conversation.findByIdAndUpdate(req.params.conversationId, {$push:{conversation:req.body}}, {
    new:true,
    runValidators:true
  })
  res.status(201).json({
    status:"success",
    data:newPhrase
  })
})

export const updatedPhrase = catchAsync(async(req,res)=>{
  const updatedPhrase = await Conversation.findByIdAndUpdate(
    req.params.conversationId, 
    {
      $set: {"conversation.$[phrase]": req.body},
    },
    {
      "multi": true,
      "arrayFilters":[
        {"phrase._id": req.params.id}
      ],
      new: true, 
      runValidators: true
    }
  )
  res.status(200).json({
    status:"success",
    updatedPhrase
  })
})


export const deletePhrase = catchAsync(async (req,res)=>{
  const updatedPhrase = await Conversation.findByIdAndUpdate(
    req.params.conversationId,
    { $pull: {"conversation": {_id: req.params.id} } },
    { runvalidators:true, upsert: true }
  )
  res.status(200).json({
    status:"success",
    data: updatedPhrase
  })
})