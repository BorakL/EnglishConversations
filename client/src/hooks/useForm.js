import { useCallback, useReducer } from "react"

const formReducer = (state, action) => {
    switch(action.type){
        case "INPUT_CHANGE" :  
            let formIsValid = true
            let formIsChanged = false
            for(const inputId in state.inputs){
                if(inputId===action.payload.inputId){
                    formIsValid = formIsValid && action.payload.isValid
                    formIsChanged = formIsChanged || action.payload.isChanged
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                    formIsChanged = formIsChanged || state.inputs[inputId].isChanged
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.payload.inputId]: {
                        ...state.inputs[action.payload.inputId],
                        [action.payload.name]: action.payload.value, 
                        isValid: action.payload.isValid,
                        isChanged: action.payload.isChanged
                    }
                },
                isValid: formIsValid,
                isChanged: formIsChanged,
                isTouched: action.payload.value ? true : false
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
        isValid: false,
        isTouched: false,
        isChanged: false
    }

    const[formState,dispatch] = useReducer(formReducer, initState)
 
    const inputHandler = useCallback((id,name,value,isValid,isChanged) => {
        dispatch({
            type:"INPUT_CHANGE",
            payload: {
                value: value,
                isValid: isValid,
                isChanged: isChanged,
                name: name,
                inputId: id
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