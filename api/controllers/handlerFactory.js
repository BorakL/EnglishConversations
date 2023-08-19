import catchAsync from "../utils/catchAsync.js";

export const getOne = Model => 
    catchAsync(async(req,res,next)=>{
        const doc = await Model.findById(req.params.id);
        res.status(200).json({
            status:"success",
            doc
        })
    })


export const createOne = Model =>  
    catchAsync(async (req,res,next)=>{
        const doc = await Model.create(req.body);
        res.status(201).json({
            status:"success",
            doc
        })
    })

export const updateOne = (Model) =>
    catchAsync(async(req,res)=>{
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!doc){
            throw new Error("No document found with that Id")
        }
        res.status(200).json({
            status:"success",
            doc
        })
    })

export const deleteOne = Model => 
    catchAsync(async(req,res,next)=>{
        const doc = await Model.findByIdAndDelete(req.params.id);
        if(!doc){
            throw new Error("No document found with that Id")
        }
        res.status(204).json({
            status:"success",
            data:null
        })  
    })

    export const getAll = (Model, setQuery) => catchAsync(async(req,res)=>{
        let query = setQuery ? setQuery(req) : {};
        const sort = {};
        if(req.query.sort){
            const sortBy = req.query.sort.trim();
            sortBy.startsWith("-") ? sort[sortBy.slice(1)]=-1 : sort[sortBy]=1 
        }else{
            sort["_id"]=1
        }
        let limit = req.query.limit*1 || 24;
        let skip = req.query.skip*1 || 0;
    
        // if(req.query.title) query.title = {$regex: req.query.title.trim(), $options:"i"}
        // if(req.params.topicId) query.topic = new mongoose.Types.ObjectId(req.params.topicId)
    
        const data = await Model.aggregate([
        {
            $facet:{
                docs: [
                    {$match: query},
                    {$sort: sort},
                    {$limit: limit},
                    {$skip: skip}
                ],
                total: [
                    {$match: query},
                    {$count: "count"}
                ]
            }
        }
        ])
        res.status(200).json({
            status: "success",
            data
        })
    })