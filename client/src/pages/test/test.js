import { useParams } from "react-router";
import { getConversation } from "../../services/api"; 
import { useEffect, useState } from "react"; 
import Task from "../../components/task/task";
import { useDispatch, useSelector } from "react-redux";
import { SET_SINGLE_CONVERSATION } from "../../reducers/conversations";


const TestConversation = () => {

    const {
        conversation
    } = useSelector( ({conversations}) => ({
        conversation: conversations.singleConversation
    }))

    const[pointer,setPointer] = useState(0)

    const params = useParams();
    const dispatch = useDispatch();

    const loadConversation = async (conversationId) => {
        const covnersationData = await getConversation(conversationId)
        dispatch({
            type: SET_SINGLE_CONVERSATION,
            payload: covnersationData.data.doc
        })
    }

    useEffect(()=>{
        loadConversation(params.conversation);
    },[params.id]) 

    useEffect(()=>{
        console.log(conversation)
    },[conversation.results])
 
    const questions = conversation.results || [] 

    const nextQuestion = ()=>{
        setPointer(prev => (prev+1)%questions.length )
    }

    const isLastQuestion = pointer===questions.length-1

    return (
        <>
        <h1>Test</h1>
        {
            questions.length ? 
            <div>
                <Task 
                    {...questions[pointer]} 
                    isLastQuestion={isLastQuestion} 
                    nextQuestion={nextQuestion}
                    totalQuestions={questions.length}
                />
            </div> :
            <p>...loading</p>
        }
        </>
    )
}

export default TestConversation;