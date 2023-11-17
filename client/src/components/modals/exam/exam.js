import { useSelector } from "react-redux";
import useForm from "../../../hooks/useForm";
import Input from "../../input/input";
import { VALIDATOR_TASK } from "../../../utils/valid";
import Button from "../../button/button";
import './exam.scss';
import { useEffect, useRef, useState } from "react";
import { GrClose,GrCheckmark  } from "react-icons/gr";


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
    console.log("formState",formState)
    const testResults = Object.values(formState.inputs) || [];
    const resultsTotal = testResults.length || 0;
    const correct = testResults.filter(i=>i.isValid).length || 0
    const incorrect = resultsTotal-correct
    const overalScore = Math.floor((correct/resultsTotal)*100)
    const requiredScore = 60;

    const isCorrect = (id)=>{
        return formState.inputs[id]?.isValid
    }

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
                    <article className= {`testQuestionWrapper ${props.examFinished ? (!isCorrect(q._id) ? "redBorder" : "greenBorder") : "defaultBorder"}`} ref={testRef}>
                        <section className="testQuestion">
                            <span>Term</span>
                            <label htmlFor={q._id}>{q.serb} {q.eng}</label>
                        </section>
                        <section className="testAnswer">
                            <span>
                                {!props.examFinished ? 
                                    "Your Answer" : 
                                    isCorrect(q._id) ? "Correct!" : "Wrong!"
                                }
                            </span> 
                            <Input
                                id={q._id}
                                type="textarea"
                                onInput={inputHandler}
                                validators = {[VALIDATOR_TASK(q.eng)]}
                                title="eng"
                                class="inputDefault"
                            />
                            {props.examFinished ? 
                                <span className="resultSign"> {isCorrect(q._id) ? <GrCheckmark/> : <GrClose/>} </span> 
                            : null}
                        </section>
                        {props.examFinished && !isCorrect(q._id) && 
                        <section className="correctAnswer">
                            <span>Correct Answer</span>
                            <span>{q.eng}</span>
                        </section>
                        }
                    </article>
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