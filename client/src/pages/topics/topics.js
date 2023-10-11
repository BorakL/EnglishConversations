import React, { useContext, useEffect, useRef, useState } from "react";
import { getTopics } from "../../services/api";
import InfiniteScroll from 'react-infinite-scroller';
import TopicItem from "../../components/topicItem/topicItem";
import './topics.scss'
import { useDispatch, useSelector } from "react-redux";
import { SET_TOPICS } from "../../reducers/topics";
import { useNavigationType } from 'react-router-dom'; 

const Topics = (props)=>{ 
    const[query,setQuery] = useState({limit:24})
    const[loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigationType = useNavigationType()

    const {
        topics,
        topicsTotal,
        initRender 
    } = useSelector(({topics,app})=>({
        topics: topics.topics,
        topicsTotal: topics.topicsTotal,
        initRender: app.initRender 
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
        if(initRender){ 
            loadTopics()  
        }else{ 
            if(navigationType!=="POP"){
                loadTopics();
            }
        }  
    },[query]) 

    return(
        <div className="explorePageWrapper" >
            <h1>Topics</h1> 
            <InfiniteScroll
                pageStart={0}
                loadMore={() => loadTopics(false,topics.length)}
                hasMore={topicsTotal>topics.length && !loading} 
                useWindow={false}
                threshold={250} 
                getScrollParent={()=>props.scrollParentRef.current}
            >
                {topics.map( t=> <TopicItem key={t._id} topic={t}/> )}
            </InfiniteScroll>
        </div>
    )
}

export default Topics