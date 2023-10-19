const initState = {
    pointer: 0,
    round: 1,
    incorrectAnswersCount: 0
}

export const SET_POINTER = "SET_POINTER";
export const SET_ROUND = "SET_ROUND";
export const SET_INCORRECT_ANSWERS_COUNT = "SET_INCORRECT_ANSWERS_COUNT"

export default (state=initState,action) => {
    switch(action.type){
        case SET_POINTER :
            return {...state, pointer: action.payload}
        case SET_ROUND :
            return {...state, round: action.payload}
        case SET_INCORRECT_ANSWERS_COUNT :
            return  {...state, incorrectAnswersCount: action.payload}
        default: return state
    }
}