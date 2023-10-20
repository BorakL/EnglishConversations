import { useOutletContext } from "react-router";
import { useEffect, useState } from "react"; 
import Task from "../../components/task/task"; 
import { useDispatch, useSelector } from "react-redux";
import { SET_POINTER, SET_ROUND } from "../../reducers/test";


const TestConversation = () => {

    const{
        pointer,
        round,
        incorrectAnswersCount,
        isAnswered
    } = useSelector(({test})=>({
        pointer: test.pointer,
        round: test.round,
        incorrectAnswersCount: test.incorrectAnswersCount,
        // isAnswered: test.isAnswered,
        // isDontKnow: test.isDontKnow,
        // isOverride: test.isOverride
    }))

    const outletContext = useOutletContext()
    const singleConversation = outletContext.conversation;
    const dispatch = useDispatch()
 
    // console.log("pointer",pointer)
    // console.log("round",round)
    // console.log("incorrectAnswers",incorrectAnswersCount)

    const[roundQuestions, setRoundQuestions] = useState([])
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
        // setPointer(prev => (prev+1)%roundQuestions.length )
        dispatch({
            type: SET_POINTER,
            payload: (pointer+1)%roundQuestions.length
        })
    }

    const getNextRound = ()=>{
        dispatch({
            type: SET_ROUND,
            payload: round+1
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