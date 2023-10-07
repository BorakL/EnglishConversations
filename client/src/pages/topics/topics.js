import React, { useEffect, useRef, useState } from "react";
import { getTopics } from "../../services/api";
import InfiniteScroll from 'react-infinite-scroller';
import TopicItem from "../../components/topicItem/topicItem";
import './topics.scss'
import { useDispatch, useSelector } from "react-redux";
import { SET_TOPICS } from "../../reducers/topics";

const Topics = ()=>{ 
    const[query,setQuery] = useState({limit:24})
    const[loading,setLoading] = useState(false)
    const scrollParentref = useRef()
    const dispatch = useDispatch()

    const {
        topics,
        topicsTotal
    } = useSelector(({topics})=>({
        topics: topics.topics,
        topicsTotal: topics.topicsTotal
    }))

    const loadTopics = async(offset=0)=>{
        try{
            setLoading(true)
            const topicsData = await getTopics({...query, skip:offset});
            dispatch({
                type: SET_TOPICS,
                payload: {
                    data: topicsData.data.data,
                    total: topicsData.data.total
                }
            })
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
        <div className="explorePageWrapper" style={{height:"800px", overflow:"auto"}} ref={scrollParentref}>
            <h1>Topics</h1>
            <div >
                <InfiniteScroll
                    pageStart={0}
                    loadMore={()=>loadTopics(topics.length)}
                    hasMore={topicsTotal>topics.length && !loading}
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