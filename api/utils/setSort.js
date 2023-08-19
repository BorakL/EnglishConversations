const setSort = (req)=>{
    const sort = {};
    if(req.query.sort){
        const sortBy = req.query.sort;
        sortBy.startsWith("-") ? sort[sortBy.slice(1)]=-1 : sort[sortBy]=1 
    }
    return sort
}

export default setSort