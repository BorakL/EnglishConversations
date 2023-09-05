///// states
// value (any)
// isValid (boolean)
// isTouched (boolean)

//// methods
// change
// touched

import { useEffect, useReducer, useRef } from "react"
import { valid } from "../../utils/valid"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Dictaphone from "../dictaphone/dictaphone"

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

const Input = (props)=>{
    const[inputState,dispatch] = useReducer(inputReducer, initValue)
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
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

    const touchHandler = (event) => {
        dispatch({
            type: "TOUCHED"
        })
    }

    const{
        value,
        isValid,
        isTouched
    } = inputState

    useEffect(()=>{
        props.onInput(props.id, value, isValid)
    },[value, isValid, isTouched, props.onInput, props.id])

    useEffect(()=>{
        dispatch({
            type:"CHANGED",
            payload: {
                value: transcript,
                validators: props.validators || []
            }
        })
    },[transcript])

    const element = props.element === "textarea" ?
    <textarea
        value={value}
        id={props.id}
        name={props.name} 
        placeholder={props.placeholder}
        onChange = {changeHandler}
        onBlur = {touchHandler}
        autoFocus
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
        <>
        <label htmlFor={props.id}> {props.id} </label>
        {element} 
        <div>{!props.isTest && isTouched && !isValid ? props.errorMessage : ""}</div>
        {props.isTest ? 
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
             
                : 
            null
        }        
        </>
    )
}

export default Input;