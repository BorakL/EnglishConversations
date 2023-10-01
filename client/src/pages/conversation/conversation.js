import React, { useEffect, useState } from "react";
import { getConversation } from "../../services/api";
import { useParams } from "react-router";
import Card from "../../components/card/card";
import {useSelector, useDispatch} from "react-redux"
import { SET_SINGLE_CONVERSATION } from "../../reducers/conversations";
import Button from "../../components/button/button";

const Conversation = ()=>{
    const {
        conversation
    } = useSelector(({ conversations }) => ({
        conversation: conversations.singleConversation
    }))
    const[learn,setLearn] = useState(false)
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
    }

    useEffect(()=>{
        loadConversation(params.conversation)
    },[])

    return(
        <div>
            <h1>{conversation.title}</h1>
            <div className="conversationName">
                <Button
                    onClick={()=>setLearn(true)}
                >
                    Learn
                </Button>
                <Button
                    onClick={()=>setLearn(false)}
                >
                    Flashcards
                </Button>
                <Button
                    to="test"
                >
                    Test
                </Button>
            </div>
            {conversation.conversation ? 
                <Card conversation={conversation.conversation}/> : <p>Loading...</p>
                :
                // <List/>
            }
        </div>
    )
}

export default Conversation;