
import { useEffect, useReducer, useRef } from "react"
import { valid } from "../../utils/valid"
import { useSpeechRecognition } from 'react-speech-recognition'
import Dictaphone from "../dictaphone/dictaphone"
import { useSpeechSynthesis } from 'react-speech-kit';


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

    useEffect(()=>{
        dispatch({
            type:"CHANGED",
            payload: {
                value: transcript,
                validators: props.validators || []
            }
        })
    },[transcript])

    const handleSubmit = (e)=>{
        e.preventDefault();
        props.submitHandler(props.id,value,isValid ? props.round : 0)
        if(isValid)speak({ text: value })
    }

    const handleTextKeyDown = (e)=>{
        if(e.key==='Enter' && !e.shiftKey){
            handleSubmit(e)
        }
    }

    const element = props.element === "textarea" ?
    <textarea
        value={value}
        id={props.id}
        name={props.name} 
        placeholder={props.placeholder}
        onChange = {changeHandler}
        onBlur = {touchHandler}
        autoFocus
        onKeyDown={handleTextKeyDown}
    />
    :
    <input
        id={props.id}
        name={props.name}
        value={value}
        placeholder={props.placeholder}
        onChange = {changeHandler}
        onBlur = {touchHandler}
    />
    
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor={props.id}> {props.id} </label>
            {element}  
            <div>
                <input 
                    disabled={!value} 
                    type="submit" 
                    value="Answer"
                />
                <Dictaphone 
                    transcript 
                    listening 
                    resetTranscript 
                    browserSupportsSpeechRecognition
                />
            </div>  
            <div>
                <button  type="button" onClick={props.dontKnowHandler}>Don't know</button> 
            </div>
        </form>
    )
}

export default TestInputField;