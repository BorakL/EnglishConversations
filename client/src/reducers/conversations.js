const initialState = {
    conversations: [],
    singleConversation: {},
    conversationsTotal: 0
}
const initStateTest = {
    pointer: 0,
    round: 1,
    incorrectAnswersCount: 0
}

export const SET_CONVERSATIONS = "SET_CONVERSATIONS";
export const SET_SINGLE_CONVERSATION = "SET_SINGLE_CONVERSATION";
export const RESET_SINGLE_CONVERSATION = "RESET_SINGLE_CONVERSATION";
export const SET_SINGLE_CONVERSATION_RESULT = "SET_SINGLE_CONVERSATION_RESULT";
export const SET_SINGLE_CONVERSATION_TEST = "SET_SINGLE_CONVERSATION_TEST";

export default (state=initialState, action) => {
    switch(action.type){
        case SET_CONVERSATIONS: {
            return {
                ...state,
                conversations: action.payload.data,
                conversationsTotal: action.payload.total
            }           
        }
        case SET_SINGLE_CONVERSATION: {
            if(action.payload && action.payload.conversation){
                let results = action.payload.conversation.map(c => {return {...c, result:"", correctRound:0}})
                let test = initStateTest
                return {
                    ...state,
                    singleConversation: {
                        ...action.payload,
                        results,
                        test
                    }
                }
            }
            return state
        }
        case SET_SINGLE_CONVERSATION_RESULT: {
            if(
                action.payload.inputId &&
                state.singleConversation.results && 
                action.payload.result
            ){
                let update = state.singleConversation
                let results = state.singleConversation.results.map(prev => 
                    prev.serb === action.payload.inputId ? 
                        {
                            ...prev,
                            result: action.payload.result,
                            correctRound: action.payload.round
                        } :
                        prev
                )
                update.results = results
                return {
                    ...state,
                    ...update
                }
            }
            return state            
        }
        case SET_SINGLE_CONVERSATION_TEST: {
            if(
                action.payload &&
                state.singleConversation.test
            ){
                let update = state.singleConversation;
                let test = {
                    ...state.singleConversation.test,
                    ...action.payload
                }
                update.test = test
                return {
                    ...state,
                    ...update
                }
            }
            return state
        }
        case RESET_SINGLE_CONVERSATION: {
            if(
                state.singleConversation && 
                state.singleConversation.results
            ){
                let update = state.singleConversation;
                let results = state.singleConversation.results.map(prev=>{return{...prev, result:'', correctRound:0}})
                update.results = results;
                return {
                    ...state,
                    ...update
                }
            }
            return state
        }
        default: return state
    }
}