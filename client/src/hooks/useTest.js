import { useDispatch } from "react-redux"
import { UPDATE_SINGLE_CONVERSATION } from "../reducers/conversations"


const useTest = (action) => {

    const dispatch = useDispatch(); 

    const submitHandler = (id,result,correctRound)=>{  
        dispatch({
            type: UPDATE_SINGLE_CONVERSATION,
            payload: {
                inputId:id,
                result,
                correctRound
            }
        })
        action();
    }

    return { 
        submitHandler
    }

}

export default useTest;