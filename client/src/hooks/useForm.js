import { useCallback, useReducer } from "react"

const formReducer = (state, action) => {
    let formIsValid = true
    let formIsChanged = false
    switch(action.type){
        case "INPUT_CHANGE" :
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
                    [action.payload.inputId]: {     //Neka rečenica na srpskom
                        name: action.payload.name,      //eng
                        value: action.payload.value,        //Some sentence on english
                        title: action.payload.title,
                        isValid:  action.payload.isValid,       //
                        isChanged: action.payload.isChanged        //
                    }
                },
                isValid: formIsValid,
                isChanged: formIsChanged,
                isTouched: action.payload.value ? true : false
            }
        case "REMOVE_INPUT" :
            for(const inputId in state.inputs){
                if(action.payload.ids.findIndex(id=>id===inputId)>=0){
                    formIsValid = formIsValid && true
                    formIsChanged = formIsChanged || true
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                    formIsChanged = formIsChanged || state.inputs[inputId].isChanged
                }
            }
            if(state.inputs && action.payload.ids.length>0){
                const prevInputs = {...state.inputs}
                action.payload.ids.forEach(id=>{
                    delete prevInputs[id]
                })
                return {
                    ...state,
                    inputs: prevInputs,
                    isValid: formIsValid,
                    isChanged: formIsChanged,
                }
            }
            return state
        case "ADD_INPUT" :
        // inputHandler = useCallback((id,name,value,isValid,isChanged) 
        // [{serb:"", eng:"", _id:id, isValid:false, isChanged:false},{serb:"", eng:"", _id:id, isValid:false, isChanged:false}]
            if(action.payload.inputs){
                // let inputs = action.payload.inputs.forEach(input => )
                
                // ...state.inputs,
                //     [action.payload.inputId]: {
                //         ...state.inputs[action.payload.inputId],
                //         [action.payload.name]: action.payload.value, 
                //         isValid: action.payload.isValid,
                //         isChanged: action.payload.isChanged
                //     }

                let inputs = action.payload.inputs.map(input => 
                    {return { [input._id]: { [input.name]:input.value, isValid:input.isValid, isChanged:input.isChanged } }} 
                )
                // {serb:"", eng:"", _id:id, isValid:false, isChanged:false}
                return state
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
 
    const inputHandler = useCallback((id,name,value,title,isValid,isChanged) => {
        dispatch({
            type:"INPUT_CHANGE",
            payload: {
                value: value,
                isValid: isValid,
                isChanged: isChanged,
                title: title,
                name: name,
                inputId: id
            }
        })
    },[])

    const removeHandler = (ids)=>{
        dispatch({
            type: "REMOVE_INPUT",
            payload: {
                ids:ids
            }
        })
    }

    const addHandler = (inputs)=>{
        dispatch({
            type:"ADD_INPUT",
            payload: {inputs} 
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
        addHandler,
        submitHandler
    }
}

export default useForm;