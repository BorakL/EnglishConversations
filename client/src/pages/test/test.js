import { useOutletContext } from "react-router";
import { useEffect, useState } from "react"; 
import Task from "../../components/task/task"; 
import { useDispatch } from "react-redux";
import { SET_SINGLE_CONVERSATION_RESULT, SET_SINGLE_CONVERSATION_TEST } from "../../reducers/conversations";


const TestConversation = () => {

    const outletContext = useOutletContext()
    const singleConversation = outletContext.conversation;

    const{
        pointer=0,
        round=1,
        incorrectAnswersCount=0
    }=singleConversation?.test || {}

    const dispatch = useDispatch()

    const[roundQuestions, setRoundQuestions] = useState([])
    const[currentQuestion,setCurrentQuestion] = useState({})

    useEffect(()=>{
        setRoundQuestions(singleConversation.results ? singleConversation.results.filter(q=>q.correctRound===0 || q.correctRound===round) : []) 
    },[round])

    useEffect(()=>{ 
        if(roundQuestions.length){
            setCurrentQuestion(singleConversation.results?.find(r=>r._id===roundQuestions[pointer]._id))
        }
    },[singleConversation.results])

    const nextQuestion = ()=>{ 
        dispatch({
            type: SET_SINGLE_CONVERSATION_TEST,
            payload: {
                pointer: (pointer+1)%roundQuestions.length
            }
        })
    }

    const getNextRound = ()=>{
        dispatch({
            type: SET_SINGLE_CONVERSATION_TEST,
            payload: {
                round: round+1
            }
        })
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
                    getNextRound={getNextRound}
                    incorrectAnswersCount={incorrectAnswersCount}
                />
                :
                <p>...loading</p>
            }
        </>
    )
}

export default TestConversation;