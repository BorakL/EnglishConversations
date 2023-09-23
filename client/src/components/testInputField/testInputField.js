
import { useEffect, useReducer, useRef } from "react"
import { valid } from "../../utils/valid"
import { useSpeechRecognition } from 'react-speech-recognition'
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
        <form onSubmit={
            (e)=>{
                e.preventDefault();
                props.submitHandler(props.id,value,isValid ? props.round : 0)
            }
        }>
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
        </form>
    )
}

export default TestInputField;