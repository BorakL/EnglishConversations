import React, { useEffect, useState } from "react";
import { getTopics } from "../../services/api";
import InfiniteScroll from 'react-infinite-scroller';
import TopicItem from "../../components/topicItem/topicItem";
import './topics.scss'
import { useDispatch, useSelector } from "react-redux";
import { SET_TOPICS } from "../../reducers/topics";
import { useNavigationType } from 'react-router-dom'; 
import { SET_INITIAL_RENDER } from "../../reducers/app";

const Topics = (props)=>{ 
    const[query,setQuery] = useState({limit:24})
    const[loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigationType = useNavigationType()
    let timer = null

    const {
        topics,
        topicsTotal,
        initRender
    } = useSelector(({topics,app})=>({
        topics: topics.topics,
        topicsTotal: topics.topicsTotal,
        initRender: app.initRender,
        scrollPosition: app.scrollPosition
    }))

    const loadTopics = async(clear=true, offset=0)=>{
        try{
            setLoading(true)
            const topicsData = await getTopics({...query, skip:offset});
            dispatch({
                type: SET_TOPICS,
                payload: {
                    data: topicsData.data.data,
                    total: topicsData.data.total,
                    clear: clear
                }
            })
			setLoading(false);
        }catch(error){
            console.log("error",error.message)
        }
    }

 
    useEffect(()=>{
        loadTopics()
        return ()=>{ 
            dispatch({
                type: SET_INITIAL_RENDER,
                payload: false
            })
        }
    },[query])

    return(
        <div className="explore-page page-wrapper">
            <div className="explore-header">
                <div className="explore-header-title header-title left-title">
                    <h1>Topics</h1> 
                </div>
            </div>
            <InfiniteScroll
                pageStart={0}
                loadMore={() => loadTopics(false,topics.length)}
                hasMore={topicsTotal>topics.length && !loading} 
                useWindow={false}
                threshold={250} 
                getScrollParent={()=>props.scrollParentRef.current}
                className="topics-container"
            >
                {topics.map( t=> <TopicItem key={t._id} topic={t} /> )}
            </InfiniteScroll>
        </div>
    )
}

export default Topics