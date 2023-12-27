import useForm from "../../hooks/useForm"
import { useState } from "react";
import Sentence from "../../components/sentence/sentence";
import Button from "../../components/button/button";
import {CSSTransition,TransitionGroup} from "react-transition-group"
import { useDispatch, useSelector } from "react-redux";
import { SET_SINGLE_CONVERSATION } from "../../reducers/conversations";
import { useOutletContext } from "react-router";

const EditConversation = ()=>{
    const{conversationData, conversationId} = useSelector(({conversations})=>({
        conversationData: conversations.singleConversation.conversation,
        conversationId: conversations.singleConversation.id
    }))

    const dispatch = useDispatch()
    const outletContext = useOutletContext();

    const{
        formState, 
        inputHandler,
        removeHandler,
        submitHandler
    } = useForm({},outletContext.editConversation)

    const removeSentenceHandler = (id)=>{
        dispatch({
            type: SET_SINGLE_CONVERSATION,
            payload: {conversation: conversationData.filter(p=>p._id!==id)}
        }) 
        removeHandler([`${id}-eng`,`${id}-serb`])
    }

    const addSentenceHandler = ()=>{
        const id=Math.random()*1000
        dispatch({
            type: SET_SINGLE_CONVERSATION,
            payload: {conversation: [...conversationData, {serb:"", eng:"", _id:id}]}
        })
    }
    
    return(
        <div className="edit-conversation-page page-wrapper">
            <form className="edit-conversation-page-form" onSubmit={submitHandler}>
                <TransitionGroup component={null}>
                    {conversationData.map(c=>
                        <CSSTransition
                            key={c._id}
                            timeout={1000}
                            classNames="conversation"
                        >
                            <Sentence
                                key={c._id}
                                serb={c.serb}
                                eng={c.eng}
                                id={c._id}
                                inputFormHandler={inputHandler}
                                isEditing={true}
                                removeSentenceHandler={removeSentenceHandler}
                            />
                        </CSSTransition>
                        
                    )} 
                </TransitionGroup>
                <div>
                    <Button
                        type="button"
                        onClick={addSentenceHandler}
                    >
                        Add Item
                    </Button>
                </div>
                <div className="right-button">
                    <Button 
                        type="submit"
                        disabled={!formState.isValid}
                    >
                        Done
                    </Button>
                </div>
                {outletContext.loading ? <h1>Loading...</h1> : null}
            </form>    
        </div>
    )
}

export default EditConversation