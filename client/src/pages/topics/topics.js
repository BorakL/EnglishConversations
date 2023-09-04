import React, { useEffect, useRef, useState } from "react";
import { getTopics } from "../../services/api";
import InfiniteScroll from 'react-infinite-scroller';
import TopicItem from "../../components/topicItem/topicItem";
import './topics.scss'

const Topics = ()=>{
    const[total,setTotal] = useState(0);
    const[topics,setTopics] = useState([])
    const[query,setQuery] = useState({limit:24})
    const[loading,setLoading] = useState(false)
    const scrollParentref = useRef()

    const loadTopics = async(offset=0)=>{
        try{
            setLoading(true)
            const topicsData = await getTopics({...query, skip:offset});
            setTopics(prev=>[...prev, ...topicsData.data.data])
            if(offset===0) setTotal(topicsData.data.total);
            setLoading(false)
        }catch(error){
            console.log("error",error.message)
        }
    }

    useEffect(()=>{ 
        if(!loading){
            loadTopics();
        }
    },[query])

    return(
        <div className="explorePageWrapper" style={{height:"100vh", overflow:"auto"}} ref={scrollParentref}>
            <h1>Topics</h1>
            <div >
                <InfiniteScroll
                    pageStart={0}
                    loadMore={()=>loadTopics(topics.length)}
                    hasMore={total>topics.length && !loading}
                    style={{display:"flex", flexWrap:"wrap"}}
                    useWindow={false}
                    threshold={250} 
                    getScrollParent={()=>scrollParentref.current}
                >
                    {topics.map( t=> <TopicItem key={t._id} topic={t}/> )}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Topics