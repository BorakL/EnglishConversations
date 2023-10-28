import { useEffect, useReducer, useRef } from "react"
import { valid } from "../../utils/valid"

const initState = {
    value:"",
    isValid: false,
    isTouched: false,
    isChanged: false
}

const inputReducer = (state=initState, action) => { 
    console.log("action.payload",action.payload)
    
    switch(action.type){
        case "CHANGED" :  
            return {
                ...state,
                value: action.payload.value,
                isValid: valid(action.payload.value, action.payload.validators),
                isChanged: action.payload.value!==action.payload.initValue
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
    
    const[inputState,dispatch] = useReducer(inputReducer, {
                                                ...initState,
                                                value: props.initValue,
                                                name: props.name,
                                                isValid: props.initValue ? true : false
                                            })

    const changeHandler = (event)=>{
        dispatch({
            type: "CHANGED",
            payload: {
                value: event.target.value,
                validators: props.validators || [],
                initValue: props.initValue
            }
        })
    }

    const touchHandler = (event) => {
        dispatch({
            type: "TOUCHED",
            payload: {
                value: event.target.value,
                validators: props.validators || [],
                initValue: props.initValue
            }
        })
    }

    const{
        value,
        isValid,
        isTouched,
        isChanged
    } = inputState

    const expandTextArea = (e)=>{
        e.target.style.height = "2em";
        e.target.style.height = (e.target.scrollHeight) + "px"; 
    }

    useEffect(()=>{
        props.onInput(props.id, props.name, value, isValid, isChanged)
    },[value, props.round, props.name, isTouched, props.onInput, props.id, isChanged])

    const element = props.type === "textarea" ?
    <textarea
        value={value}
        id={props.id || props.name}
        name={props.name} 
        placeholder={props.placeholder}
        onChange = {changeHandler}
        onBlur = {touchHandler}
        autoFocus
        onInput={expandTextArea} 
    />
    :
    <input
        id={props.id || props.name}
        name={props.name}
        value={value}
        placeholder={props.placeholder}
        onChange = {changeHandler}
        onBlur = {touchHandler}
    />
    
    return(
        <div className={props.class}>
            {/* <label htmlFor={props.id}> {props.id} </label> */} 
            {element} 
            {isTouched && !isValid ? <div>{props.errorMessage}</div> : null}
        </div>
    )
}

export default Input;