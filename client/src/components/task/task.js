import { useEffect, useRef, useState } from "react";
import { VALIDATOR_TASK } from "../../utils/valid";
import useTest from "../../hooks/useTest";
import TestInputField from "../testInputField/testInputField"; 
import WrongAnswer from "./wrongAnswer";
import FinishedRound from "./finishedRound";
import FinishedTest from "./finishedTest";
import "./task.scss";

const Task = (props)=>{

    const[isAnswered,setIsAnswered]=useState(false)
    const[nextRoundMessage, setNextRoundMessage] = useState(false)
    const[incorrectAnswersCount,setIncorrectAnswersCount] = useState(0)
    const[dontKnow, setDontKnow]=useState(false)
    const[isOverride, setIsOverride]=useState(false)
    const correctAnswersCount = props.results?.filter(r=>r.correctRound>props.round-1).length || 0
    const correctAnswersTotal = props.results?.filter(r=>r.correctRound>0).length || 0
    const refNext = useRef()

    const action = ()=>{
        setIsAnswered(true)
        setIsOverride(false)
    }

    const {
        sendAnswer
    } = useTest(action)

    const next = ()=>{
        if(props.pointer===props.roundQuestionsCount-1) {
            props.setRound(prev=>prev+1)
            setNextRoundMessage(true)
        }
        setIsAnswered(false)
        setDontKnow(false)
        props.nextQuestion()
    }

    const nextRound = ()=>{
        setNextRoundMessage(false)
        setIncorrectAnswersCount(0)
    }

    useEffect(()=>{
        if(isAnswered){
            setIncorrectAnswersCount(prev=>props.currentQuestion.correctRound ? prev : prev+1)
        }else if(isOverride){
            setIncorrectAnswersCount(prev=>prev>=1 ? prev-1 : prev)
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

    const dontKnowHandler = ()=>{
        setIsAnswered(true);
        setDontKnow(true)
    }

    const overrideHandler = ()=>{
        sendAnswer(props.currentQuestion.serb, props.currentQuestion.eng, props.round);
        next();
        setIsOverride(true)
    }

    return(
        <div className="taskContainer">
            <div className="taskMain">
            {
                !isAnswered && !nextRoundMessage
                ?
                <TestInputField
                    name={props.serb}
                    id={props.serb}
                    placeholder="Type the English"
                    submitHandler={sendAnswer}
                    dontKnowHandler={dontKnowHandler}
                    validators={[VALIDATOR_TASK(props.eng)]}
                    errorMessage="Incorrect"
                    isTest
                    round={props.round}
                    style="textareaDefault"
                />
                :
                    !nextRoundMessage ?
                        <WrongAnswer
                            correctRound={props.currentQuestion.correctRound}
                            eng={props.eng}
                            next={next}
                            refNext={refNext}
                            dontKnow={dontKnow}
                            overrideHandler={overrideHandler}
                        />
                        :
                        props.roundQuestionsCount ? 
                            <FinishedRound
                                correctAnswersTotal={correctAnswersTotal}
                                results={props.results}
                                nextRound={nextRound}
                            />
                            : 
                            <FinishedTest
                                results={props.results}
                                round={props.round}
                                getAllResults={getAllResults}
                            />
            } 
            </div>
            <div className="taskSidebar">
                <p>Remaining: {props.roundQuestionsCount - correctAnswersCount - incorrectAnswersCount}</p>
                <p>Incorrect Answers: {incorrectAnswersCount}</p>
                <p>Correct: {correctAnswersTotal}</p>
            </div>
        </div>
    )
}

export default Task;