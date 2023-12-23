import React, { useEffect, useRef, useState } from "react";
import { getConversation, updateConversation } from "../../services/api";
import { Outlet, useOutlet, useParams } from "react-router";
import {useSelector, useDispatch} from "react-redux"
import { SET_SINGLE_CONVERSATION, SET_SINGLE_CONVERSATION_RESULT, SET_SINGLE_CONVERSATION_TEST } from "../../reducers/conversations";
import "./conversation.scss"
import ConversationNav from "../../components/conversationNav/conversationNav";
import Sentence from "../../components/sentence/sentence";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import Button from "../../components/button/button";
import { Link } from "react-router-dom";

const Conversation = ()=>{
    const {
        conversation
    } = useSelector(({ conversations }) => ({
        conversation: conversations.singleConversation
    })) 

    const[initLoading,setInitLoading] = useState(true)
    const[loading,setLoading] = useState(false)
    const[editingFields, setEditingFields] = useState([])

    const dispatch = useDispatch();
    const params = useParams();
    const outlet = useOutlet(); 
    const targetRef = useRef(); 

    const loadConversation = async(conversationId) => {
        try{
            setInitLoading(true)
            const conversationData = await getConversation(conversationId);
            dispatch({
                type:SET_SINGLE_CONVERSATION,
                payload: conversationData.data.doc
            })
            setInitLoading(false)
        }catch(error){
            console.log(error)
        }
    }

    const editConversation = async (values) => {
        if(values.isValid && Object.keys(values.inputs).length>0){
            setLoading(true)
            const newConversation = conversation.conversation.map(c => {
                if(values.inputs[`${c._id}-eng`] && values.inputs[`${c._id}-serb`]){
                    let inputEng = values.inputs[`${c._id}-eng`];
                    let inputSerb = values.inputs[`${c._id}-serb`];
                    return {serb:inputSerb.value, eng:inputEng.value, _id:c._id}
                }else{
                    return c
                }
            })
            try{
                await updateConversation(conversation.id, {"conversation":newConversation.map(c=>{return{"serb":c.serb, "eng":c.eng}} )})
                dispatch({
                    type: SET_SINGLE_CONVERSATION,
                    payload: {conversation: newConversation}
                }) 
                setLoading(false)
                setEditingFields([])
            }catch(error){
                setLoading(false)
                console.log("error",error)
            }
        }
    }
    
    useEffect(()=>{ 
        
        loadConversation(params.conversation)
      
        if(conversation && conversation.id===params.conversation && localStorage.test && localStorage.results){
            dispatch({
                type: SET_SINGLE_CONVERSATION_TEST,
                payload: localStorage.test
            })
            dispatch({
                type: SET_SINGLE_CONVERSATION_RESULT,
                payload: localStorage.results
            })
        }
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
            <div className="conversation-wrapper page-wrapper">
                <div className="conversation-header">
                    <div className="conversation-header-nav">
                        <span>
                            <Link to="/topics">Topics</Link> / 
                            <Link to={`/topics/${conversation.topic?._id}`}> {conversation.topic?.title} </Link> 
                        </span>
                    </div>
                    <div className="conversation-header-title">
                        <h1>{conversation.title}</h1>
                    </div>
                </div>
                <ConversationNav/>
                <>
                {
                    
                    initLoading ? <h1>Loading...</h1> :
                         <>
                        {!outlet ?
                            <>
                                <div className="covnersation-wrapper-content" ref={targetRef}>
                                    <ul>
                                        {conversation.conversation?.map(c=><Sentence 
                                                                                key={c._id}
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
                        <Outlet context={{
                            loading, 
                            conversation, 
                            editConversation,
                            setEditingFields,
                            editingFields    
                        }}/>
                         </>
                }
                </>
            </div>
    )
}

export default Conversation;