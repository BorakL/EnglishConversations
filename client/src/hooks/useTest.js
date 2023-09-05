import { useCallback, useReducer } from "react"

const testReducer = (state, action)=>{
    switch(action.type){
        case "TASK_ANSWERED" : 
            let inputs = {
                ...state.inputs,
                [action.payload.inputId]: {
                    value: action.payload.value,
                    isValid: action.payload.isValid
                }
            }
            let totalCorrectAnswers = Object.values(inputs).filter(i=>i.isValid===true).length
            return {
                inputs,
                totalCorrectAnswers,
                poens: Math.floor(totalCorrectAnswers/Object.values(inputs).length*100)
            }
        default: return state
    }
}

const useTest = (inputs,action)=>{
    const initState = {
        inputs,
        totalCorrectAnswers:0,
        poens:0
    }
    const[testState,dispatch] = useReducer(testReducer,initState)

    const inputHandler = useCallback((id,value,isValid)=>{
        dispatch({
            type: "TASK_ANSWERED",
            payload: {
                inputId:id,
                value,
                isValid
            }
        })
    },[])

    const submitHandler = (e)=>{
        e.preventDefault();
        action(testState);
    }

    return {
        testState,
        inputHandler,
        submitHandler
    }

}

export default useTest;