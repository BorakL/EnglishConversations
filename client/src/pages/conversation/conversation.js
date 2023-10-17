import React, { useEffect, useState } from "react";
import { getConversation } from "../../services/api";
import { Outlet, useLocation, useOutlet, useParams } from "react-router";
import {useSelector, useDispatch} from "react-redux"
import { SET_SINGLE_CONVERSATION } from "../../reducers/conversations";
import "./conversation.scss"
import ConversationNav from "../../components/conversationNav/conversationNav";
import Sentence from "../../components/sentence/sentence";

const Conversation = ()=>{
    const {
        conversation
    } = useSelector(({ conversations }) => ({
        conversation: conversations.singleConversation
    }))

    const[initLoad,setInitLoad]=useState(false)
    const dispatch = useDispatch();
    const params = useParams();  
    const location = useLocation();
    const host = "http://localhost:3001/img/topics/";
    const outlet = useOutlet(); 

    const loadConversation = async(conversationId) => {
        try{
            const conversationData = await getConversation(conversationId);
            dispatch({
                type:SET_SINGLE_CONVERSATION,
                payload: conversationData.data.doc
            })
        }catch(error){
            console.log(error.message)
        }
        setInitLoad(true)
    }

    useEffect(()=>{
        loadConversation(params.conversation)
    },[])

    const isInitPage = location.pathname.split("/")
    console.log("isInitPage",isInitPage)

    return( 
        initLoad ? 
            <div className="conversationWrapper">
                <h1>{conversation.title}</h1>
                <ConversationNav conversation={conversation}/>
                {!outlet ?
                <>
                <div>
                    <img alt="topic" src={`${host}${conversation.topic.title}.jpg`}/>
                </div>
                <div>
                    <ul>
                        {conversation.conversation.map(c=><Sentence 
                                                                id={c._id} 
                                                                serb={c.serb}
                                                                eng={c.eng}
                                                            />)}
                    </ul>
                </div>
                </>
                :
                null}
                <Outlet context={{conversation: conversation}}/>
            </div>
        :
        <p>Loading...</p> 
        
    )
}

export default Conversation;