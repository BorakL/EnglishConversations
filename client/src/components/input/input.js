import { useEffect, useReducer, useRef } from "react"
import { valid } from "../../utils/valid"

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
        props.onInput(props.id, value, isValid)
    },[value, props.round, isTouched, props.onInput, props.id])

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
        {/* <label htmlFor={props.id}> {props.id} </label> */}
        {element} 
        {/* <div>{isTouched && !isValid ? props.errorMessage : ""}</div> */}
        </>
    )
}

export default Input;