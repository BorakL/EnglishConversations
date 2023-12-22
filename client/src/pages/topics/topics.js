import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { getTopics } from "../../services/api";
import InfiniteScroll from 'react-infinite-scroller';
import TopicItem from "../../components/topicItem/topicItem";
import './topics.scss'
import { useDispatch, useSelector } from "react-redux";
import { SET_TOPICS } from "../../reducers/topics";
import { useNavigationType } from 'react-router-dom'; 
import { SET_INITIAL_RENDER, SET_SCROLL_POSITION } from "../../reducers/app";

const Topics = (props)=>{ 
    const[query,setQuery] = useState({limit:24})
    const[loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigationType = useNavigationType()
    let timer = null

    const {
        topics,
        topicsTotal,
        initRender,
        scrollPosition
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
        if(initRender){ 
            // 
            console.log("učitava se na init load")
        }else{ 
            if(navigationType!=="POP"){
                // loadTopics();
            }
            // props.scrollParentRef.current.scrollTo(0,scrollPosition)
        }
        return ()=>{ 
            dispatch({
                type: SET_INITIAL_RENDER,
                payload: false
            })
        }
    },[query])
    
    // const handleScroll = function(e){
    //     if(props.scrollParentRef.current.scrollTop>0){ 
    //         if(timer!==null){
    //             clearTimeout(timer)
    //         }
    //         timer = setTimeout(()=>{
    //             dispatch({
    //                 type: SET_SCROLL_POSITION,
    //                 payload: props.scrollParentRef.current.scrollTop
    //             })
    //         },130)
    //     }
    // }

    // useEffect(()=>{ 
    //     props.scrollParentRef.current.addEventListener("scroll",handleScroll,false)
    //     return ()=>{props.scrollParentRef.current.removeEventListener("scroll",handleScroll,false)}
    // },[])

    return(
        <div className="explore-page page-wrapper">
            <div className="explore-header">
                <div className="explore-header-title left-title">
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
            >
                {topics.map( t=> <TopicItem key={t._id} topic={t} /> )}
            </InfiniteScroll>
        </div>
    )
}

export default Topics