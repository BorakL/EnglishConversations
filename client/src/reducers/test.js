const initState = {
    pointer: 0,
    round: 1,
    incorrectAnswersCount: 0,
    isAnswered: false,
    isOverride: false
}

export const SET_POINTER = "SET_POINTER";
export const SET_ROUND = "SET_ROUND";
export const SET_INCORRECT_ANSWERS_COUNT = "SET_INCORRECT_ANSWERS_COUNT"
export const SET_IS_ANSWERED = "SET_IS_ANSWERED"
export const SET_IS_OVERRIDE = "SET_IS_OVERRIDE"

export default (state=initState,action) => {
    switch(action.type){
        case SET_POINTER :
            return {...state, pointer: action.payload}
        case SET_ROUND :
            return {...state, round: action.payload}
        case SET_INCORRECT_ANSWERS_COUNT :
            return  {...state, incorrectAnswersCount: action.payload}
        case SET_IS_ANSWERED : 
            return {...state, isAnswered: action.payload}
        case SET_IS_OVERRIDE : 
            return {...state, isOverride: action.payload}
        default: return state
    }
}