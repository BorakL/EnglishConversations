import React, { useEffect, useState } from "react";
import { getConversation } from "../../services/api";
import { useParams } from "react-router";
import Cards from "../../components/card/cards";

const Conversation = ()=>{
    const params = useParams();
    const[conversation,setConversations]=useState({})

    const loadConversation = async(conversationId) => {
        try{
            const conversationData = await getConversation(conversationId);
            setConversations(conversationData.data.doc)
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
            {conversation.conversation ? <Cards conversation={conversation.conversation}/> : <p>Loading...</p>}
        </div>
    )
}

export default Conversation;