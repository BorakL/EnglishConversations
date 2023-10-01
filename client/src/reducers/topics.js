const initState = {
    topics: [],
    topicsTotal: 0,
    singleTopic: {}
}

export const SET_TOPICS = "SET_TOPICS";
export const SET_SINGLE_TOPIC = "SET_SINGLE_TOPIC";

export default (state=initState, action) => {
    switch(action.type){
        case SET_TOPICS: 
            return {
                ...state,
                topics: [
                    ...state.topics,
                    ...action.payload.data
                ],
                topicsTotal: action.payload.total
            }
        case SET_SINGLE_TOPIC:
            return {
                ...state,
                singleTopic: action.payload
            }
        default: return state
    }
}
