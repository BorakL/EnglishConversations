import { useEffect, useRef, useState } from "react";
import { VALIDATOR_TASK } from "../../utils/valid";
import useTest from "../../hooks/useTest";
import TestInputField from "../testInputField/testInputField"; 

const Task = (props)=>{

    const[isAnswered,setIsAnswered]=useState(false)
    const[nextRoundMessage, setNextRoundMessage] = useState(false)
    const[incorrectAnswersCount,setIncorrectAnswersCount] = useState(0)
    const correctAnswersCount = props.results?.filter(r=>r.correctRound>props.round-1).length || 0
    const correctAnswersTotal = props.results?.filter(r=>r.correctRound>0).length || 0
    const refNext = useRef()

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

    useEffect(()=>{
        document.addEventListener("keypress",handleKeyDown)
        return ()=>{document.removeEventListener("keypress",handleKeyDown)}
    },[])

    const getAllResults = (results=[],round=0)=>{
        let allResults = [];
        for(let i=1; i<round; i++){
            allResults.push(results.map(
                r => {
                    if(r.correctRound===i){
                        return <div key={i}>Correct {r.serb}</div>
                    }else if(r.correctRound>i){
                        return <div key={i}>Incorrect {r.serb}</div>
                    }
                    return null
                }
            )
        )}
        return allResults
    }

    const handleKeyDown = (e)=>{
        if(!nextRoundMessage && refNext.current && e.key==='Enter' && !e.shiftKey){
            e.preventDefault();
            refNext.current.click()
        }
    }

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
                <button onClick={next} ref={refNext}>Next</button>
            </div>
            :
            props.roundQuestionsCount ?
            <div>
                <h2>Last Question</h2>
                <p>Overall Progress: {`${correctAnswersTotal}/${props.results.length}`}</p>
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
            :
            <div>
                <h1>The end</h1>
                <div>
                {
                    getAllResults(props.results,props.round).map((result,i) =>
                        <div key={i}>
                            <h3>Round {i+1}</h3>
                            {result}
                        </div>
                    )
                }
                </div>
            </div>

        }
        <div>
            <p>Remaining: {props.roundQuestionsCount - correctAnswersCount - incorrectAnswersCount}</p>
            <p>Incorrect Answers: {incorrectAnswersCount}</p>
            <p>Correct: {correctAnswersTotal}</p>
        </div>
        </>
    )
}

export default Task;