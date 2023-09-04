import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { getTopicConversations } from "../../services/api";
import InfiniteScroll from "react-infinite-scroller";
import ConversationItem from "../../components/conversationItem/conversationItem";
import './topic.scss';

const Topic = ()=>{
    const[conversations,setConversations] = useState([]);
    const[total,setTotal] = useState(0)
    const[loading,setLoading] = useState(false)
    const[query,setQuery] = useState({limit:12})
    const params = useParams(); 
    const scrollParentRef = useRef();

    const loadTopicConversations = async (offset=0)=>{
        try{
            setLoading(true)
            const conversationsData = await getTopicConversations(params.id, {...query, skip:offset});
            setConversations(prev=>[...prev,...conversationsData.data.data])
            setTotal(conversationsData.data.total)
            setLoading(false)
        }catch(error){
            console.log(error.message)
        } 
    }

    useEffect(()=>{
        loadTopicConversations()
    },[query])

    return(
        <div style={{height:"700px", overflow:"auto"}} ref={scrollParentRef}>
            <h1>One Topic</h1>
            <div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={()=>loadTopicConversations(conversations.length)}
                    hasMore={total>conversations.length && !loading}
                    useWindow={false}
                    threshold={250}
                    style={{display:"flex", flexWrap:"wrap"}}
                    getScrollParent = {()=>scrollParentRef.current}
                >
                    {conversations.map(c=> <ConversationItem key={c._id} conversation={c} />)}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Topic;