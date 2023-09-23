import { useEffect, useState } from "react"; 
import { VALIDATOR_TASK } from "../../utils/valid";
import useTest from "../../hooks/useTest";
import TestInputField from "../testInputField/testInputField";

const Task = (props)=>{

    const[isAnswered,setIsAnswered]=useState(false) 
    const[nextRoundMessage, setNextRoundMessage] = useState(false)
    const[incorrectAnswersCount,setIncorrectAnswersCount] = useState(0)
    const correctAnswersCount = props.results?.filter(r=>r.correctRound>props.round-1).length || 0
    const correctAnswersTotal = props.results?.filter(r=>r.correctRound>0).length || 0

    const action = ()=>{
        setIsAnswered(true)
    }

    const {
        submitHandler
    } = useTest(action)

    const next = ()=>{
        if(props.pointer===props.roundQuestionsCount-1) {
            props.setRound(prev=>prev+1)
            setNextRoundMessage(true) 
        } 
        setIsAnswered(false)
        props.nextQuestion()
    } 

    const nextRound = ()=>{ 
        setNextRoundMessage(false)
        setIncorrectAnswersCount(0)
    }

    useEffect(()=>{
        if(isAnswered){
            setIncorrectAnswersCount(prev=>props.currentQuestion.correctRound ? prev : prev+1)
        } 
    },[props.currentQuestion])

    console.log("props.results",props.results)

    return( 
        <>
        {
            !isAnswered && !nextRoundMessage
            ? 
            <TestInputField
                element="textarea"
                name={props.serb}
                id={props.serb}
                placeholder="Type the English"
                submitHandler={submitHandler}
                validators={[VALIDATOR_TASK(props.eng)]}
                errorMessage="Incorrect"
                isTest
                round={props.round}
            /> 
            :
            !nextRoundMessage ? 
            <div>
                <p>{props.currentQuestion.correctRound ? "Correct" : "Wrong"}</p>
                <p>Answered: {props.currentQuestion.result}</p>
                <p>Correct answer: {props.eng}</p>
                <button onClick={next}>Next</button>
            </div>
            :
            <div>
                <h2>Last Question</h2> 
                <p>Correct answers:</p>
                <p>Poens:</p>
                <button onClick={nextRound}>Next round</button>

                <div>
                {
                    props.results.map(result => {  
                        if(result.correctRound===0){ 
                            return <div>Incorrect {result.serb} {result.eng} </div> 
                        }else if(result.correctRound===props.round-1){
                            return <div>True {result.serb} {result.eng} </div>  
                        }else{
                            return null
                        } 
                    })
                }
                </div>

            </div> 

        }
        <div>
            <p>Remaining: {props.roundQuestionsCount - correctAnswersCount}</p>
            <p>Incorrect Answers: {incorrectAnswersCount}</p>
            <p>Correct: {correctAnswersTotal }</p>
        </div>
        </>
    )
}

export default Task;