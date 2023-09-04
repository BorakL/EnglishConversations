import { useParams } from "react-router";
import { getConversation } from "../../services/api"; 
import { useEffect, useState } from "react"; 
import Task from "../../components/task/task";


const TestConversation = () => {

    const[conversation,setConversation] = useState({}) 
    const[pointer,setPointer] = useState(0)

    const params = useParams();

    const loadConversation = async (conversationId)=>{
        const covnersationData = await getConversation(conversationId)
        setConversation(covnersationData) 
    }

    useEffect(()=>{
        loadConversation(params.conversation);
    },[params.id])
 
    const questions = conversation?.data?.doc?.conversation || [] 

    const nextQuestion = ()=>{
        setPointer(prev => questions.length===prev+1 ? prev : prev+1)
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
                />
            </div> :
            <p>...loading</p>
        }
        </>
    )
}

export default TestConversation;