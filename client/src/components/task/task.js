import { useContext, useEffect, useRef, useState } from "react";
import { VALIDATOR_TASK } from "../../utils/valid";
import useTest from "../../hooks/useTest";
import TestInputField from "../testInputField/testInputField"; 
import FinishedRound from "./finishedRound";
import FinishedTest from "./finishedTest";
import "./task.scss";
import ProgressBar from "../progressBar/progressBar";
import Result from "./result";
import Button from "../button/button";  
import Modal from "../uiElements/modal";
import { AppContext } from "../../context/appContext";
import { useDispatch, useSelector } from "react-redux";
import { SET_INCORRECT_ANSWERS_COUNT } from "../../reducers/test";

const Task = (props)=>{

    // const[pointer,setPointer] = useState(0)
    // const[round,setRound] = useState(1)
    //props.incorrectAnswersCount,setIncorrectAnswersCount

    const[isAnswered,setIsAnswered]=useState(false)
    const[nextRoundMessage, setNextRoundMessage] = useState(false)
    const[dontKnow, setDontKnow]=useState(false)
    const[isOverride, setIsOverride]=useState(false)
    const[isModalOpen, setIsModalOpen]=useState(false)

    const dispatch = useDispatch()

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
            props.getNextRound()
            setNextRoundMessage(true)
        }
        setIsAnswered(false)
        setDontKnow(false)
        props.nextQuestion()
    }

    const nextRound = ()=>{
        setNextRoundMessage(false)
        // setIncorrectAnswersCount(0)
        dispatch({
            type: SET_INCORRECT_ANSWERS_COUNT,
            payload: 0
        })
    }

    useEffect(()=>{
        if(isAnswered){
            // setIncorrectAnswersCount(prev=>props.currentQuestion.correctRound ? prev : prev+1)
            dispatch({
                type: SET_INCORRECT_ANSWERS_COUNT,
                payload: props.currentQuestion.correctRound ? props.incorrectAnswersCount : props.incorrectAnswersCount+1
            })
        }else if(isOverride){
            // setIncorrectAnswersCount(prev => prev>=1 ? prev-1 : prev)
            dispatch({
                type: SET_INCORRECT_ANSWERS_COUNT,
                payload: props.incorrectAnswersCount>=1 ? props.incorrectAnswersCount-1 : props.incorrectAnswersCount
            })
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

    const closeModalOptions = ()=>{
        setIsModalOpen(false)
    }
    const openModalOptions = ()=>{
        setIsModalOpen(true)
    }
    
    const appContext = useContext(AppContext)

    const remainingProgress = Math.ceil((props.roundQuestionsCount-correctAnswersCount-props.incorrectAnswersCount)/props.roundQuestionsCount*100)
    const remainingProgressCount = props.roundQuestionsCount-(correctAnswersCount+props.incorrectAnswersCount)
    const incorrectProgress = Math.ceil((props.incorrectAnswersCount/props.roundQuestionsCount)*100)
    const correctProgress = Math.ceil((correctAnswersTotal/props.results.length)*100)

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
                        <Result
                            currentQuestion={props.currentQuestion}
                            answer={props.currentQuestion.result}
                            eng={props.eng}
                            serb={props.serb}
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
                <div className="progressBars">
                    <ProgressBar 
                        progress={remainingProgress}
                        count={remainingProgressCount}
                        title="Remaining"    
                    /> 
                    <ProgressBar 
                        progress={incorrectProgress}
                        count={props.incorrectAnswersCount}
                        title="Incorrect"    
                    /> 
                    <ProgressBar 
                        progress={correctProgress}
                        count={correctAnswersCount}
                        title="Correct"    
                    /> 
                </div>
                <div className="taskOptions">
                    <Button 
                        type="button" 
                        style="buttonText"
                        onClick={openModalOptions}
                    >
                        Options
                    </Button>
                </div>
                
            </div>
            {
                <Modal 
                    show={isModalOpen} 
                    closeHandler={closeModalOptions}
                    header={<h2>Options</h2>} 
                >    
                    <Button
                        type="button"
                        onClick={()=>{
                            closeModalOptions();
                            appContext.turnAudio();
                        }}
                    >
                        Audio
                    </Button>
                    <Button 
                        style="buttonText" 
                        type="button"
                        onClick={()=>{
                            closeModalOptions();
                        }}
                    >
                        Restart write
                    </Button>
                </Modal>
            }
        </div>
    )
}

export default Task;