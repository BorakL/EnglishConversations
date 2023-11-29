import { useEffect, useState } from "react";
import Sentence from "../sentence/sentence";
import useForm from "../../hooks/useForm";
import Button from "../button/button";
import { useOutletContext } from "react-router";
import { updateConversation } from "../../services/api";   
import {useDispatch, useSelector} from "react-redux"
import { SET_SINGLE_CONVERSATION } from "../../reducers/conversations";

const List = ()=>{

    const[editingFields,setEditingFields]=useState([]) 
    const dispatch = useDispatch()

    const{conversationData, conversationId} = useSelector(({conversations}) => ({
        conversationData: conversations.singleConversation.conversation,
        conversationId: conversations.singleConversation.id
    }))

    const action = async (values) => { 
        if(values.isValid && Object.keys(values.inputs).length>0){
            const newConversation = conversationData.map(c => {
                if(values.inputs[`${c._id}-eng`] && values.inputs[`${c._id}-serb`]){
                    let inputEng = values.inputs[`${c._id}-eng`];
                    let inputSerb = values.inputs[`${c._id}-serb`];
                    return {serb:inputSerb.value, eng:inputEng.value, _id:inputSerb.name}
                }else{
                    return c
                }
            })
            try{
                await updateConversation(conversationId, {"conversation":newConversation})
                dispatch({
                    type: SET_SINGLE_CONVERSATION ,
                    payload: {conversation: newConversation}
                })
                setEditingFields([])
            }catch(error){
                console.log("error",error)
            }
        }
    }

    const {
        inputHandler,
        submitHandler,
        removeHandler,
        formState
    } = useForm({}, action)

    const conversation = conversationData.map(c => 
        <Sentence 
            key={c._id}
            serb={c.serb} 
            eng={c.eng} 
            id={c._id}
            inputFormHandler={inputHandler}
            removeFormHandler={removeHandler}
            editingFields={editingFields}
            setEditingFields={setEditingFields}
        />
    )

    return(
        <>
        {editingFields.length>0 ? 
            <form onSubmit={submitHandler}>
                {conversation}
                <Button
                    type="submit"
                    disabled={!formState?.isChanged || !formState?.isValid}
                />
            </form>
            : 
            conversation    
        }
        </>
    )
}

export default List;