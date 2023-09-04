import { useMemo, useState } from "react";
import useForm from "../../hooks/useForm";
import Input from "../input/input"
import { VALIDATOR_TASK } from "../../utils/valid";

const Task = (props)=>{

    const[isAnswered,setIsAnswered]=useState(false)
    const[answer,setAnswer]=useState("")
    const[isCorrect,setIsCorrect]=useState(false)

    const initValues = {
        [props.serb]: {
            value: "",
            isvalid: false
        }
    }

    const action = (data)=>{
        setAnswer(data?.inputs[props.serb].value)
        setIsAnswered(true)
        setIsCorrect(data?.inputs[props.serb].isValid)
    }

    const {
        formState,
        inputHandler,
        submitHandler
    } = useForm(initValues,action)

    const next = ()=>{
        setAnswer("")
        setIsCorrect(false)
        setIsAnswered(false)
        props.nextQuestion()
    }
    
    return(
        
            !isAnswered 
            ?
            <form onSubmit={submitHandler}>
                <div>
                    <Input
                        element="textarea"
                        name={props.serb}
                        id={props.serb}
                        placeholder="Type the English"
                        onInput={inputHandler}
                        validators={[VALIDATOR_TASK(props.eng)]}
                        errorMessage="Incorrect"
                        isTest
                    />
                </div>
                <div>
                    
                </div>        
            </form>
            :
            !props.isLastQuestion ?
            <div>
                <p>{isCorrect ? "Correct" : "Wrong"}</p>
                <p>Answered: {answer}</p>
                <p>Correct answer: {props.eng}</p>
                <button onClick={next}>Next</button>
            </div>
            :
            <div>Last Question</div>
    )
}

export default Task;