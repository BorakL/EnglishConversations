import { useCallback, useMemo, useReducer } from "react"

const formReducer = (state, action) => { 
    switch(action.type){
        case "INPUT_CHANGE" :
            let formIsValid = true
            for(const inputId in state.inputs){
                if(inputId===action.payload.inputId){
                    formIsValid = formIsValid && action.payload.isValid
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid 
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.payload.inputId]: {
                        value: action.payload.value, 
                        isValid: action.payload.isValid
                    }
                },
                isValid: formIsValid
            }
        default: return state
    }
}

const useForm = (inputs, action) => {
    
    // const initValues = {
    //     name : {
    //         value: "Pera",
    //         isValid: true
    //     },
    //     age: {
    //         value: 33,
    //         isValid: true
    //     }
    // }

    const initState ={
        inputs,
        isValid: false
    }

    const[formState,dispatch] = useReducer(formReducer, initState)
 
    const inputHandler = useCallback((id,value,isValid)=>{
        dispatch({
            type:"INPUT_CHANGE",
            payload: {
                value,
                isValid,
                inputId:id
            }
        })
    },[])

    const submitHandler = (e)=>{
        e.preventDefault();
        action(formState)
    }

    return {
        formState, 
        inputHandler,
        submitHandler
    }
}

export default useForm;