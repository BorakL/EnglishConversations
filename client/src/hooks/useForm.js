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
                        ...state.inputs[action.payload.inputId],
                        [action.payload.name]: action.payload.value, 
                        isValid: action.payload.isValid
                    }
                },
                isValid: formIsValid
            }
        case "REMOVE_INPUT" :
            const prevInputs = {...state.inputs}
            delete prevInputs[action.payload.inputId]
            return {
                ...state,
                inputs: prevInputs

            }
        default: return state
    }
}

const useForm = (inputs, action) => {

    const initState ={
        inputs,
        isValid: false
    }

    const[formState,dispatch] = useReducer(formReducer, initState)
 
    const inputHandler = useCallback((id,name,value,isValid) => { 
        dispatch({
            type:"INPUT_CHANGE",
            payload: {
                value: value,
                isValid: isValid,
                name: name,
                inputId:id
            }
        })
    },[])

    const removeHandler = (id)=>{
        dispatch({
            type: "REMOVE_INPUT",
            payload: {
                inputId:id
            }
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        action(formState)
    }

    return {
        formState, 
        inputHandler,
        removeHandler,
        submitHandler
    }
}

export default useForm;