import { useSelector } from "react-redux";
import useForm from "../../../hooks/useForm";
import Input from "../../input/input";
import { VALIDATOR_TASK } from "../../../utils/valid";
import Button from "../../button/button";
import './exam.scss';
import { useEffect, useRef, useState } from "react";

const Exam = (props)=>{
    // const{singleConversation:questions} = useSelector(({conversations})=>({
    //     singleConversation: conversations.singleConversation.conversation
    // }));

    // const[examFinished,setExamFinished]=useState(false)
    const testRef = useRef(null)
    const{
        inputHandler,
        submitHandler,
        formState
    } = useForm({},(values)=>{
        document.querySelector(".fullScreenModal").scrollTo({top: 0, behavior:'smooth'})
        alert("Did you finish the exam?")
        props.setExamFinished(true);
    })

    const testResults = Object.values(formState.inputs) || [];
    const resultsTotal = testResults.length || 0;
    const correct = testResults.filter(i=>i.isValid).length || 0
    const incorrect = resultsTotal-correct
    const overalScore = Math.floor((correct/resultsTotal)*100)
    const requiredScore = 60;

    return(
        <form className="testWindow" onSubmit={submitHandler}>
            {
            props.examFinished ?
            <div>                                
                <div className="">
                    <h2>{overalScore>requiredScore ? "Pass" : "Failed"}</h2>
                </div>
                <div className="overalScore">
                    <span>Overal score: </span> <span>{overalScore}%</span>
                </div>
                <div className="requiredScore">
                    <span>Required score: </span> <span>{requiredScore}%</span>
                </div>
                <div className="correct">
                    <span>Correct: </span> <span>{correct}</span>
                </div>
                <div className="questionsAsked">
                    <span>Incorrect: </span> <span>{incorrect}</span>
                </div>
            </div>
            : null
            }
            <div className="testQuestions" ref={testRef}>
            {
                props.questions.map(q=>
                    <div className="testQuestionWrapper">
                        <div className="testQuestion">
                            <span>Term</span>
                            <label>{q.serb} {q.eng}</label>
                        </div>
                        <div className="testAnswer">
                            <span>You Answer</span>
                            <Input
                                id={q._id}
                                type="textarea"
                                onInput={inputHandler}
                                validators = {[VALIDATOR_TASK(q.eng)]}
                                title="eng"
                                class="inputDefault"
                            />
                        </div>
                    </div>
                )
            } 
            </div>
            <div className="testResult">
            {
            !props.examFinished ? 
                <Button type="submit">End Test</Button>
                : null                 
            }
            </div>
        </form>
    )
}

export default Exam;