
import { useContext, useEffect, useReducer, useRef, useState } from "react"
import { valid } from "../../utils/valid"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Dictaphone from "../dictaphone/dictaphone"
import { useSpeechSynthesis } from 'react-speech-kit'; 
import Button from "../button/button";
import { AppContext } from "../../context/appContext";


const initValue = {
    value:"",
    isValid: false,
    isTouched: false
}

const inputReducer = (state=initValue, action) => {
    switch(action.type){
        case "CHANGED" : 
            return {
                ...state,
                value: action.payload.value,
                isValid: valid(action.payload.value, action.payload.validators)
            }
        case "TOUCHED" : 
            return {
                ...state,
                isTouched: true
            }
        default: return state
    }
}

const TestInputField = (props)=>{
    const[inputState,dispatch] = useReducer(inputReducer, initValue)
    const[isMicrophoneTurn,setIsMicrophoneTurn] = useState(false)
    const {
        transcript
      } = useSpeechRecognition();

    const changeHandler = (event)=>{
        dispatch({
            type: "CHANGED",
            payload: {
                value: event.target.value,
                validators: props.validators || []
            }
        })
    }

    const touchHandler = () => {
        dispatch({
            type: "TOUCHED"
        })
    }

    const{
        value,
        isValid,
        isTouched
    } = inputState

    const { speak } = useSpeechSynthesis();
    const appContext = useContext(AppContext)

    useEffect(()=>{
        dispatch({
            type:"CHANGED",
            payload: {
                value: transcript,
                validators: props.validators || []
            }
        })
    },[transcript])

    useEffect(()=>{
        if(isMicrophoneTurn){
            SpeechRecognition.startListening()
        }else{
            SpeechRecognition.stopListening()
        }
        return ()=>{
            SpeechRecognition.stopListening();
        }
    },[isMicrophoneTurn])

    const handleSubmit = (e)=>{
        e.preventDefault();
        props.submitHandler(props.id, value, isValid ? props.round : 0)
        if(isValid && appContext.globalOptions?.audio)speak({ text: value })
    }

    const handleTextKeyDown = (e)=>{
        if(e.key==='Enter' && !e.shiftKey && value){
            handleSubmit(e)
        }
    }

    const expandTextArea = (e)=>{
        e.target.style.height = "10px";
        e.target.style.height = (e.target.scrollHeight) + "px"; 
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <div className="questionContainer">
                <div> {props.id} </div> 
                <Button  
                    type="button" 
                    onClick={props.dontKnowHandler}
                    style="buttonText"
                >
                    Don't know
                </Button>  
            </div>

            <div className="answerContainer">
                 
                <textarea
                    value={value}
                    id={props.id}
                    name={props.name} 
                    placeholder={props.placeholder}
                    onChange = {changeHandler}
                    onBlur = {touchHandler}
                    autoFocus
                    onKeyDown={handleTextKeyDown}
                    onInput={expandTextArea}
                />  
                <Dictaphone 
                    transcript  
                    setIsMicrophoneTurn={setIsMicrophoneTurn}
                    isMicrophoneTurn={isMicrophoneTurn}
                    browserSupportsSpeechRecognition
                />
            
            </div>

            <div className="answerButton"> 
                <Button
                    disabled={!value}
                    type="submit"
                >
                    Answer
                </Button>
            </div>
                
            

            
        </form>
    )
}

export default TestInputField;