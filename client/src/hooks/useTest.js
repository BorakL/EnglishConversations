import { useDispatch } from "react-redux"
import { SET_SINGLE_CONVERSATION_RESULT } from "../reducers/conversations"


const useTest = (action) => {

    const dispatch = useDispatch(); 

    const sendAnswer = (id,result,round)=>{
        dispatch({
            type: SET_SINGLE_CONVERSATION_RESULT,
            payload: {
                inputId:id,
                result,
                round
            }
        })
        action();
    }

    return { 
        sendAnswer
    }

}

export default useTest;