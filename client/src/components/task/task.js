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
import { RESET_SINGLE_CONVERSATION, SET_SINGLE_CONVERSATION_TEST } from "../../reducers/conversations";
import Exam from "../modals/exam/exam";
import Options from "../modals/options/options";

const Task = (props)=>{ 

    const{singleConversation:questions} = useSelector(({conversations})=>({
        singleConversation: conversations.singleConversation.conversation
    }));

    const[isAnswered,setIsAnswered]=useState(false)
    const[isOverride, setIsOverride]=useState(false)
    const[nextRoundMessage, setNextRoundMessage] = useState(false)
    const[dontKnow, setDontKnow]=useState(false)
    const[isModalExamOpen, setIsModalExamOpen]=useState(false)
    const[isModalOptionsOpen, setIsModalOptionsOpen]=useState(false)
    const[isShowResult, setIsShowResult]=useState(false)

    const dispatch = useDispatch()

    const correctAnswersCount = props.results?.filter(r=>r.correctRound===props.round).length || 0
    const correctAnswersTotal = props.results?.filter(r=>r.correctRound>0).length || 0
    const refNext = useRef()
    
    const[examFinished,setExamFinished]=useState(false)    

    const action = ()=>{
        setIsAnswered(true)
        setIsOverride(false)
        setIsShowResult(true)
    }

    const resetTest = ()=>{
        dispatch({
            type: SET_SINGLE_CONVERSATION_TEST,
            payload: {
                pointer:0,
                round:1,
                incorrectAnswersCount:0
            }
        })
        dispatch({
            type: RESET_SINGLE_CONVERSATION
        })
        setIsAnswered(false)
        setNextRoundMessage(false)
        setIsModalOptionsOpen(false);
    }

    const {
        sendAnswer
    } = useTest(action)

    const next = ()=>{
        setIsAnswered(false)
        setDontKnow(false)
        setIsShowResult(false)
    }

    useEffect(()=>{
        if(isAnswered || isOverride){
            let payload = 0;
            if(isAnswered){
                payload = props.currentQuestion.correctRound ? props.incorrectAnswersCount : props.incorrectAnswersCount+1
            }else if(isOverride){
                payload = props.incorrectAnswersCount>=1 ? props.incorrectAnswersCount-1 : props.incorrectAnswersCount
            }
            dispatch({
                type: SET_SINGLE_CONVERSATION_TEST,
                payload: {incorrectAnswersCount: payload}
            })
            if(props.pointer===props.roundQuestionsCount-1) {
                setNextRoundMessage(true)
            }
            props.nextQuestion()
        }
    },[props.currentQuestion, props.roundQuestionsCount])

    useEffect(()=>{
        return()=>{
            if(nextRoundMessage){
                props.getNextRound()
                dispatch({
                    type: SET_SINGLE_CONVERSATION_TEST,
                    payload: {incorrectAnswersCount: 0}
                })
            }  
        }
    },[nextRoundMessage])

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

    const closeModalExam = ()=>{
        if(!examFinished){
            alert("Are you sure you want to leave?")
        }
        setIsModalExamOpen(false)
        setExamFinished(false)
    }
    const openModalOptions = ()=>{
        setIsModalOptionsOpen(true)
    }
    
    const appContext = useContext(AppContext)

    const remainingProgress = props.roundQuestionsCount===0 ? 0 : Math.ceil((props.roundQuestionsCount-correctAnswersCount-props.incorrectAnswersCount)/props.roundQuestionsCount*100)
    const remainingProgressCount = props.roundQuestionsCount-(correctAnswersCount+props.incorrectAnswersCount)
    const incorrectProgress = Math.ceil((props.incorrectAnswersCount/props.roundQuestionsCount)*100)
    const correctProgress = Math.ceil((correctAnswersTotal/props.results.length)*100)

    const testInputField = <TestInputField
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

    const result = <Result
                        currentQuestion={props.currentQuestion}
                        answer={props.currentQuestion.result}
                        eng={props.eng}
                        serb={props.serb}
                        next={next}
                        refNext={refNext}
                        dontKnow={dontKnow}
                        overrideHandler={overrideHandler}
                    />
                       
    const finishedRound = <FinishedRound
                            correctAnswersTotal={correctAnswersTotal}
                            results={props.results}
                            // nextRound={nextRound}
                            setNextRoundMessage={setNextRoundMessage}
                        />

    const finishedTest = <FinishedTest
                            results={props.results}
                            round={props.round}
                            getAllResults={getAllResults}
                        />
    

    return(
        <div className="taskContainer">
            <div className="taskMain">
            {
                props.roundQuestionsCount>0 
                ?
                (!isAnswered && nextRoundMessage ?
                            finishedRound : 
                            !isAnswered ? testInputField : result
                )
                :
                finishedTest
            }
            </div>
            <div className="taskSidebar">
                <div className="progressBars">
                    <h3>Round: {props.round}</h3>
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
                        count={correctAnswersTotal}
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
                <div className="taskOptions">
                    <Button 
                        type="button" 
                        onClick={()=>setIsModalExamOpen(true)}
                    >
                        Exam
                    </Button>
                </div>
                
            </div>
            {
                <Modal
                    show={isModalOptionsOpen} 
                    closeHandler={()=>setIsModalOptionsOpen(false)}
                    header={<h2>Options</h2>}
                >
                    <Options
                        resetTest={resetTest}
                        appContext={appContext}                    
                    />
                </Modal>
            }
            {
                <Modal
                    show={isModalExamOpen} 
                    closeHandler={closeModalExam}
                    header={<h2>Test</h2>}
                    fullScreen={true}
                >
                    <Exam
                        questions={questions}
                        setExamFinished={setExamFinished}
                        examFinished={examFinished}
                    />
                </Modal>
            }
        </div>
    )
}

export default Task;