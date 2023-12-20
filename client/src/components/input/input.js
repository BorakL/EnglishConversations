import { useEffect, useReducer, useRef } from "react"
import { valid } from "../../utils/valid"

const initState = {
    value:"",
    isValid: false,
    isTouched: false,
    isChanged: false
}

const inputReducer = (state=initState, action) => { 
    
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
        case "RESET" :
            return {
                ...initState
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
            type: "TOUCHED"
        })
    }

    const resetHandler = ()=>{
        dispatch({type:"RESET"})
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
        props.onInput(props.id, props.name, value, props.title, isValid, isChanged)
    },[value, props.round, props.name, isTouched, props.onInput, props.id, isChanged])

    useEffect(()=>{
        if(props.resetField){
            resetHandler();
        }   
    },[props.resetField])

    const element = props.type === "textarea" ?
    <textarea
        value={value}
        id={props.id || props.name}
        name={props.name} 
        placeholder={props.placeholder}
        onChange = {changeHandler}
        onBlur = {touchHandler}
        autoFocus = {props.autoFocus}
        onInput={expandTextArea} 
        title={props.title}
    />
    :
    <input
        id={props.id || props.name}
        type={props.type}
        name={props.name}
        value={value}
        title={props.title}
        placeholder={props.placeholder}
        onChange = {changeHandler}
        onBlur = {touchHandler}
        disabled = {props.disabled}
    />
    
    return(
        <div className="inputField">
            {props.id && props.name && props.label ? <label htmlFor={props.id}>{props.name}</label> : null}
            {element} 
            {isTouched && !value ?
                props.isRequired ? <div className="inputField-errorMessage">This field is required</div> : ""
                :
                isTouched && !isValid && props.errorMessage ? 
                    <div className="inputField-errorMessage">
                        {props.errorMessage}
                    </div> :
                     null
            }
        </div>
    )
}

export default Input;