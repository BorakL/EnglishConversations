import { useOutletContext } from "react-router";
import useForm from "../../hooks/useForm"
import { useEffect, useState } from "react";
import Sentence from "../../components/sentence/sentence";
import Button from "../../components/button/button";
import {CSSTransition,TransitionGroup} from "react-transition-group"

const EditConversation = ()=>{
    const outletContext = useOutletContext().conversation?.conversation || []
    const[conversationContent,setConversationContent] = useState(outletContext);

    const action = (value)=>{
        console.log("formState",value)
    }

    const{
        formState, 
        inputHandler,
        removeHandler,
        submitHandler
    } = useForm({},action)

    const removeSentenceHandler = (translateId,sentenceIds)=>{
        setConversationContent(prev=>prev.filter(p=>p._id!==translateId)) 
        removeHandler(sentenceIds)
    }

    const addSentenceHandler = ()=>{
        const id=Math.random()*1000
        setConversationContent(prev=>[...prev,{serb:"", eng:"", _id:id, isValid:false, isChanged:false}])
    }

    
    return(
        <>
            <form className="conversationWrapper" onSubmit={submitHandler}>
                <TransitionGroup component={null}>
                    {conversationContent.map(c=>
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
            </form>    
        </>
    )
}

export default EditConversation