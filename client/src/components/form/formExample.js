import React from "react";
import Input from "../../components/input/input";
import useForm from "../../hooks/useForm.js";
import { VALIDATOR_MINLENGTH } from "../../utils/valid";

const FormExample = ()=>{

    const initValues = {
        name : {
            value: "",
            isValid: false
        },
        surname: {
            value:"",
            isValid: false
        },
        age: {
            value: "",
            isValid: false
        }
    }

    const action = (data) => {
        console.log("action",data)
    }
    
    const{
        formState,
        inputHandler,
        submitHandler
    } = useForm(initValues, action)
    
    
    return (
    <div>
        <h1>Form</h1>

        <form onSubmit={submitHandler}>

            <Input
                id="name"
                type="text"
                element="input"
                placeholder="name"
                errorMessage="Error name"
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(4)]}
            />

            <Input
                id="surname"
                type="text"
                element="input"
                placeholder="surname"
                errorMessage="Error surname"
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(4)]}
            />

            <input type="submit"/>

        </form>

        

    </div>
    )
}

export default FormExample;