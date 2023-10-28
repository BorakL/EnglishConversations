const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_TASK = "TASK";
const VALIDATOR_TYPE_CHANGED ="CHANGED"

export const VALIDATOR_REQUIRE = () => ({type: VALIDATOR_TYPE_REQUIRE})
export const VALIDATOR_CHANGED = (val) => ({
    type: VALIDATOR_TYPE_CHANGED, 
    value: val
})
export const VALIDATOR_MAXLENGTH = val => ({
    type: VALIDATOR_TYPE_MAXLENGTH,
    value: val
})
export const VALIDATOR_MINLENGTH = (val) => ({
    type: VALIDATOR_TYPE_MINLENGTH,
    value: val
})
export const VALIDATOR_MAX = (val) => ({
    type: VALIDATOR_TYPE_MAX,
    value: val
})
export const VALIDATOR_MIN = (val) => ({
    type: VALIDATOR_TYPE_MIN,
    value: val
})
export const VALIDATOR_TASK = (val) => ({
    type: VALIDATOR_TYPE_TASK,
    value: val
})

export const valid = (value, validators)=>{
    let isValid = true;
    for(const validator of validators){
        if(validator.type===VALIDATOR_TYPE_REQUIRE){
            isValid = isValid && value.trim().length !== 0
        }
        if(validator.type===VALIDATOR_TYPE_MAXLENGTH){ 
            isValid = isValid && value.trim().length < validator.value
        }
        if(validator.type===VALIDATOR_TYPE_MINLENGTH){ 
            isValid = isValid && value.trim().length > validator.value
        }
        if(validator.type===VALIDATOR_TYPE_MAX){
            isValid = isValid && value < validator.value
        }
        if(validator.type===VALIDATOR_TYPE_MIN){
            isValid = isValid && value > validator.value
        }
        if(validator.type===VALIDATOR_TYPE_TASK){
            isValid = isValid && value.trim()===validator.value
        }
        if(validator.type===VALIDATOR_TYPE_CHANGED){
            isValid = isValid && value.trim()===validator.value
        }
    }
    return isValid
}