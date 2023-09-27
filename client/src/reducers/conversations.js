const initialState = {
    conversations: [],
    singleConversation: {},
    conversationsTotal: 0
}

export const SET_CONVERSATIONS = "SET_CONVERSATIONS";
export const SET_SINGLE_CONVERSATION = "SET_SINGLE_CONVERSATION";
export const UPDATE_SINGLE_CONVERSATION = "UPDATE_SINGLE_CONVERSATION";

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
                return {
                    ...state,
                    singleConversation: {
                        ...action.payload,
                        results
                    }
                }
            }
            return state
        }
        case UPDATE_SINGLE_CONVERSATION: {
            console.log("action.payload.inputId",action.payload.inputId)
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
                            correctRound: action.payload.correctRound
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
        default: return state
    }
}