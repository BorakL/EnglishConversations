import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { getTopic, getTopicConversations } from "../../services/api";
import InfiniteScroll from "react-infinite-scroller";
import ConversationItem from "../../components/conversationItem/conversationItem";
import './topic.scss';
import { useDispatch, useSelector } from "react-redux"; 
import { SET_CONVERSATIONS } from "../../reducers/conversations";
import { AuthContext } from "../../context/authContext";
import { SET_SINGLE_TOPIC } from "../../reducers/topics";
import { Link } from "react-router-dom";

const Topic = ()=>{
    const {
        conversations,
        totalConversations,
        topic
    } = useSelector(({conversations, topics}) => ({
        conversations: conversations.conversations,
        topic: topics.singleTopic,
        totalConversations: conversations.total
    }))

    const[loading,setLoading] = useState(false)
    const dispatch = useDispatch();
    const[query,setQuery] = useState({limit:12})
    const params = useParams(); 
    const scrollParentRef = useRef();

    const loadTopic = async ()=>{
        try{
            const topic = await getTopic(params.id)
            dispatch({
                type: SET_SINGLE_TOPIC,
                payload: topic.data.doc
            })
            console.log("topic.data.doc",topic.data.doc)
        }catch(error){
            console.log("error",error)
        }
    }

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
        loadTopicConversations();
        loadTopic(params.id)
    },[query])

    const{loggedIn, logout} = useContext(AuthContext)
    const topicUrl = `${process.env.REACT_APP_API_BASE_URL}/img/topics/${topic.title}.jpg`;
    const defaultTopicUrl = `${process.env.REACT_APP_BASE_URL}/default-image.jpg`;

    return(
        <>
        {
        !loading ?
        <div className="topic-page page-wrapper" ref={scrollParentRef}>
            <div className="topic-header">
                <div className="topic-header-nav">
                    <span>
                        <Link to="/topics">Topics/</Link>{topic.title}
                    </span>
                </div>
                <div className="topic-header-title left-title">
                    <h1>{topic.title}</h1>
                </div>
                <div className="topic-header-img">
                    <img src={false ? topicUrl : defaultTopicUrl}/>
                </div>
                <div className="topic-header-info">

                </div>
            </div>
            <p> {loggedIn ? "logged in" : "not logged in"}</p>
            {loggedIn ? <button onClick={logout}>logout</button> : null}
            <div className="conversations-container">
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