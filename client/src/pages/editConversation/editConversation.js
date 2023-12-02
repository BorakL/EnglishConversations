import useForm from "../../hooks/useForm"
import { useState } from "react";
import Sentence from "../../components/sentence/sentence";
import Button from "../../components/button/button";
import {CSSTransition,TransitionGroup} from "react-transition-group"
import { useDispatch, useSelector } from "react-redux";
import { SET_SINGLE_CONVERSATION } from "../../reducers/conversations";
import { updateConversation } from "../../services/api";

const EditConversation = ()=>{
    const{conversationData, conversationId} = useSelector(({conversations})=>({
        conversationData: conversations.singleConversation.conversation,
        conversationId: conversations.singleConversation.id
    }))

    const[loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    const action = async (values) => {
        if(values.isValid && Object.keys(values.inputs).length>0){
            setLoading(true)
            const newConversation = conversationData.map(c => {
                if(values.inputs[`${c._id}-eng`] && values.inputs[`${c._id}-serb`]){
                    let inputEng = values.inputs[`${c._id}-eng`];
                    let inputSerb = values.inputs[`${c._id}-serb`];
                    return {serb:inputSerb.value, eng:inputEng.value, _id:c._id}
                }else{
                    return c
                }
            })
            try{
                await updateConversation(conversationId, {"conversation":newConversation.map(c=>{return{"serb":c.serb, "eng":c.eng}} )})
                dispatch({
                    type: SET_SINGLE_CONVERSATION,
                    payload: {conversation: newConversation}
                }) 
                setLoading(false)
            }catch(error){
                setLoading(false)
                console.log("error",error)
            }
        }
    }

    const{
        formState, 
        inputHandler,
        removeHandler,
        submitHandler
    } = useForm({},action)

    const removeSentenceHandler = (translateId,sentenceIds)=>{
        dispatch({
            type: SET_SINGLE_CONVERSATION,
            payload: {conversation: conversationData.filter(p=>p._id!==translateId)}
        }) 
        removeHandler(sentenceIds)
    }

    const addSentenceHandler = ()=>{
        const id=Math.random()*1000
        dispatch({
            type: SET_SINGLE_CONVERSATION,
            payload: {conversation: [...conversationData, {serb:"", eng:"", _id:id}]}
        })
    }
    
    return(
        <>
            <form className="conversationWrapper" onSubmit={submitHandler}>
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
                <Button
                    type="button"
                    onClick={addSentenceHandler}
                >
                    Add Item
                </Button>
                <Button 
                    type="submit"
                    disabled={!formState.isValid}
                >
                    Done
                </Button>
                {loading ? <h1>Loading...</h1> : null}
            </form>    
        </>
    )
}

export default EditConversation