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
            let update = [];
            if(!action.payload.clear){
                for(let i=0; i<action.payload.data.length; i++){
                    let topic = action.payload.data[i] 
                    if(!state.topics.find(t=>t._id===topic._id)){
                        update.push(topic)
                    }
                }
            }else{
                update = action.payload.data
            }
            return {
                ...state,
                topics: action.payload.clear
                    ? action.payload.data
                    : [...state.topics, ...update],
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
