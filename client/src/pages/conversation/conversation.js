import React, { useEffect, useRef, useState } from "react";
import { getConversation } from "../../services/api";
import { Outlet, useOutlet, useParams } from "react-router";
import {useSelector, useDispatch} from "react-redux"
import { SET_SINGLE_CONVERSATION } from "../../reducers/conversations";
import "./conversation.scss"
import ConversationNav from "../../components/conversationNav/conversationNav";
import Sentence from "../../components/sentence/sentence";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import Button from "../../components/button/button";

const Conversation = ()=>{
    const {
        conversation
    } = useSelector(({ conversations }) => ({
        conversation: conversations.singleConversation
    }))

    const[initLoad,setInitLoad]=useState(false)
    const dispatch = useDispatch();
    const params = useParams();
    const host = "http://localhost:3001/img/topics/";
    const outlet = useOutlet(); 
    const targetRef = useRef(); 

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
 
    const options={
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.MEDIUM,
            format: 'A4'
        },
        overrides: {
            pdf: {
               compress: true
            }
         }
    } 

    const createPdf = ()=>{
        generatePDF(targetRef,options) 
    }

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
                <div ref={targetRef}>
                    <ul>
                        {conversation.conversation.map(c=><Sentence 
                                                                id={c._id} 
                                                                serb={c.serb}
                                                                eng={c.eng}
                                                            />)}
                    </ul>
                </div>
                <Button onClick={createPdf}> Download PDF </Button>
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