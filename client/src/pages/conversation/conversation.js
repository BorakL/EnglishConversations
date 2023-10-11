import React, { useEffect, useState } from "react";
import { getConversation } from "../../services/api";
import { useParams } from "react-router";
import Card from "../../components/card/card";
import {useSelector, useDispatch} from "react-redux"
import { SET_SINGLE_CONVERSATION } from "../../reducers/conversations";
import Button from "../../components/button/button";
import List from "../../components/list/list";
import "./conversation.scss"
import ConversationNav from "../../components/conversationNav/conversationNav";

const Conversation = ()=>{
    const {
        conversation
    } = useSelector(({ conversations }) => ({
        conversation: conversations.singleConversation
    }))

    const[initLoad,setInitLoad]=useState(false)
    const[list,setList] = useState(false)
    const dispatch = useDispatch();
    const params = useParams();  

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

    return( 
        initLoad ? 
            <div className="conversationWrapper">
                <h1>{conversation.title}</h1>
                <ConversationNav list={list} setList={setList}/>
                {conversation.conversation ?
                    !list ?
                    <Card conversation={conversation.conversation}/>
                    :
                    <List conversation={conversation.conversation}/> 
                : <p>Loading...</p>
                }
            </div>
        :
        <p>Loading...</p> 
        
    )
}

export default Conversation;