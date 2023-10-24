import { useDispatch } from "react-redux"
import { UPDATE_SINGLE_CONVERSATION } from "../reducers/conversations"


const useTest = (action) => {

    const dispatch = useDispatch(); 

    const sendAnswer = (id,result,round)=>{
        dispatch({
            type: UPDATE_SINGLE_CONVERSATION,
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