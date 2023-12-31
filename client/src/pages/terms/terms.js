import { useEffect, useState } from "react";
import Sentence from "../../components/sentence/sentence";
import useForm from "../../hooks/useForm";
import Button from "../../components/button/button";
import { useOutletContext } from "react-router";
import { updateConversation } from "../../services/api";   
import {useDispatch, useSelector} from "react-redux"
import { SET_SINGLE_CONVERSATION } from "../../reducers/conversations";
import { Link } from "react-router-dom";

const Terms = ()=>{

    const dispatch = useDispatch()
    const outletContext = useOutletContext();

    const{conversationData, conversationId} = useSelector(({conversations}) => ({
        conversationData: conversations.singleConversation.conversation,
        conversationId: conversations.singleConversation.id
    }))


    const {
        inputHandler,
        submitHandler,
        removeHandler,
        formState
    } = useForm({}, outletContext.editConversation)

    const conversation = conversationData.map(c => 
        <Sentence 
            key={c._id}
            serb={c.serb} 
            eng={c.eng} 
            id={c._id}
            inputFormHandler={inputHandler}
            removeFormHandler={removeHandler}
            editingFields={outletContext.editingFields}
            setEditingFields={outletContext.setEditingFields}
            soundButton={true}
        />
    )

    return(
        <>
        {outletContext.editingFields.length>0 ? 
            <form onSubmit={submitHandler}>
                {conversation}  
                <Button
                    type="submit"
                    lg
                    disabled={!formState?.isChanged || !formState?.isValid}
                >
                    Edit
                </Button> 
            </form>
            : 
            <div>
                {conversation}
                <Button
                    to="edit"
                    lg
                >
                    Add/Remove
                </Button>    
                
            </div>
        }
        </>
    )
}

export default Terms;