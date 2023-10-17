import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { getTopicConversations } from "../../services/api";
import InfiniteScroll from "react-infinite-scroller";
import ConversationItem from "../../components/conversationItem/conversationItem";
import './topic.scss';
import { useDispatch, useSelector } from "react-redux"; 
import { SET_CONVERSATIONS } from "../../reducers/conversations";

const Topic = ()=>{
    const {
        conversations,
        totalConversations
    } = useSelector(({conversations}) => ({
        conversations: conversations.conversations,
        totalConversations: conversations.total
    }))

    const[loading,setLoading] = useState(false)
    const dispatch = useDispatch();
    const[query,setQuery] = useState({limit:12})
    const params = useParams(); 
    const scrollParentRef = useRef();

    const loadTopicConversations = async (offset=0)=>{
        try{
            setLoading(true)
            const conversationsData = await getTopicConversations(params.id, {...query, skip:offset});
            dispatch({
                type: SET_CONVERSATIONS,
                payload: {
                    data: conversationsData.data.data,
                    total: conversationsData.data.total
                }
            })
            setLoading(false)
        }catch(error){
            console.log(error.message)
        } 
    }

    useEffect(()=>{
        loadTopicConversations()
    },[query])

    return(
        <>
        {
        !loading ?
        <div className="topicPage" ref={scrollParentRef}>
            <h1>One Topic</h1>
            <div className="conversationsContainer">
                {conversations.map(c=> <ConversationItem key={c._id} conversation={c} />)}
            </div>
        </div>
        : 
        <p>loading...</p>
        }
        </>
    )
}

export default Topic;