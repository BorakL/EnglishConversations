const initState={
    initRender: true,
    scrollPosition:0
}

export const SET_INITIAL_RENDER = "SET_INITIAL_RENDER";
export const SET_SCROLL_POSITION = "SET_SCROLL_POSITION";

export default (state=initState,action)=>{
    console.log("action",action)
    switch(action.type){
        case SET_INITIAL_RENDER:
            return {
                ...state,
                initRender: action.payload
            }
        case SET_SCROLL_POSITION:
            return {   
                ...state,
                scrollPosition: action.payload
            }
        default: return state
    }
}