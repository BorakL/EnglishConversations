import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UPDATE_SINGLE_CONVERSATION } from "../reducers/conversations"


const useTest = (action) => {



    const dispatch = useDispatch();

    const inputHandler = useCallback((id,result,isCorrect)=>{ 
        dispatch({
            type: UPDATE_SINGLE_CONVERSATION,
            payload: {
                inputId:id,
                result,
                isCorrect
            }
        })
    },[])

    const submitHandler = (e)=>{ 
        e.preventDefault();
        action();
    }

    return {
        inputHandler,
        submitHandler
    }

}

export default useTest;