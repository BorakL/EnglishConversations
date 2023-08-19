import React, { useEffect } from "react";
import { getTopics } from "../../services/api";

const Topics = ()=>{
    const getTopics = async()=>{
        try{
            const topics = await getTopics();
            console.log("topics",topics)
        }catch(error){
            console.log("error",error.message)
        }
        
    }
    useEffect(()=>{
        getTopics()
    },[])

    return(
        <div>
            Topics
        </div>
    )
}

export default Topics