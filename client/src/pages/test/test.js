import { useOutletContext } from "react-router";
import { useEffect, useState } from "react"; 
import Task from "../../components/task/task"; 


const TestConversation = () => {

    const outletContext = useOutletContext()
    const singleConversation = outletContext.conversation;

    const[pointer,setPointer] = useState(0)
    const[roundQuestions, setRoundQuestions] = useState([])
    const[round,setRound] = useState(1)
    const[currentQuestion,setCurrentQuestion] = useState({})  

    useEffect(()=>{
        setRoundQuestions(singleConversation.results ? singleConversation.results.filter(q=>q.correctRound===0) : []) 
    },[round])

    useEffect(()=>{ 
        if(roundQuestions.length){
            setCurrentQuestion(singleConversation.results?.find(r=>r._id===roundQuestions[pointer]._id))
        }
    },[singleConversation.results])

    const nextQuestion = ()=>{ 
        setPointer(prev => (prev+1)%roundQuestions.length )
    }
    

    return (
        <>
            {
            singleConversation && singleConversation.results && singleConversation.results.length ? 
                <Task 
                    {...roundQuestions[pointer]} 
                    results={singleConversation.results} 
                    currentQuestion={currentQuestion}
                    nextQuestion={nextQuestion} 
                    roundQuestionsCount={roundQuestions.length}
                    pointer={pointer}
                    round={round}
                    setRound={setRound}
                />
                :
                <p>...loading</p>
            }
        </>
    )
}

export default TestConversation;