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

export const getAll = (Model, setQuery, lookupOptions=[]) => catchAsync(async(req,res)=>{
    let query = setQuery ? setQuery(req) : {};
    const sort = {};
    if(req.query.sort){
        const sortBy = req.query.sort.trim();
        sortBy.startsWith("-") ? sort[sortBy.slice(1)]=-1 : sort[sortBy]=1 
    }else{
        sort["_id"]=1
    }
    let limit = req.query.limit*1 || 12;
    let skip = req.query.skip*1 || 0;
    let lookup = lookupOptions.length>0 ? [...lookupOptions] : []

    let data = await Model.aggregate([
    {
        $facet:{
            docs: [
                {$match: query},
                {$sort: sort},
                {$skip: skip},
                {$limit: limit},
                ...lookup
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
        data: data[0].docs,
        total: data[0].total.length>0 ? data[0].total[0].count : 0
    })
})