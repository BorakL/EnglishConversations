import { useState } from "react";
import Input from "../input/input"
import { VALIDATOR_TASK } from "../../utils/valid";
import useTest from "../../hooks/useTest";

const Task = (props)=>{

    const[isAnswered,setIsAnswered]=useState(false)
    const[answer,setAnswer]=useState("")
    const[isCorrect,setIsCorrect]=useState(false)


    // const initValues = {
    //     [props.serb]: {
    //         value: "",
    //         isvalid: false
    //     }
    // }

    const action = ()=>{
        setIsAnswered(true)
        // setIsCorrect(data?.inputs[props.serb].isValid)
        // setTestItems(
        //     prev => [
        //         ...prev,
        //         {
        //             serb: props.serb,
        //             eng: props.eng,
        //             answer: data?.inputs[props.serb].value
        //         }
        //     ]
        // )
    }

    const {
        inputHandler,
        submitHandler
    } = useTest(action)

    const next = ()=>{
        setAnswer("")
        setIsCorrect(false)
        setIsAnswered(false)
        props.nextQuestion()
    }

    const testState={}

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
            <div>
                <h2>Last Question</h2>
                <p>Total question: {props.totalQuestions}</p>
                <p>Correct answers: {testState.totalCorrectAnswers}</p>
                <p>Poens: {testState.poens}</p>
                {/* <div>
                    {testItems.map((item) =>
                        <div key={item._id}>
                            <div>Serb: {item.serb}</div>
                            <div>Eng: {item.eng}</div>
                            <div>Answer: {item.answer}</div>
                            <hr/>
                        </div>
                    )}
                </div> */}
            </div>
    )
}

export default Task;