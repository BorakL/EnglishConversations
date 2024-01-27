import { useSelector } from "react-redux";
import useForm from "../../../hooks/useForm";
import Input from "../../input/input";
import { VALIDATOR_TASK } from "../../../utils/valid";
import Button from "../../button/button";
import './exam.scss';
import { useEffect, useRef, useState } from "react";
import { GrClose,GrCheckmark  } from "react-icons/gr";


const Exam = (props)=>{
    
    const testRef = useRef(null)
    const{
        inputHandler,
        submitHandler,
        formState
    } = useForm({},()=>{
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

    const isCorrect = (id)=>{
        return formState.inputs[id]?.isValid
    }

    return(
        <form className="test-window" onSubmit={submitHandler}>
            {
            props.examFinished ?
            <div>
                <div className="">
                    <h2>{overalScore>requiredScore ? "Pass" : "Failed"}</h2>
                </div>
                <div className="overal-score">
                    <span>Overal score: </span> <span>{overalScore}%</span>
                </div>
                <div className="required-score">
                    <span>Required score: </span> <span>{requiredScore}%</span>
                </div>
                <div className="correct">
                    <span>Correct: </span> <span>{correct}</span>
                </div>
                <div className="questions-asked">
                    <span>Incorrect: </span> <span>{incorrect}</span>
                </div>
            </div>
            : null
            }
            
            <div className="test-questions" ref={testRef}>
            {
                props.questions.map(q=>
                    <article 
                        className= {`test-question-wrapper ${props.examFinished ? (!isCorrect(q._id) ? "redBorder" : "greenBorder") : "defaultBorder"}`} 
                        ref={testRef}
                        key={q._id}
                    >
                        <section className="test-question">
                            <span>Term</span>
                            <label htmlFor={q._id}>{q.serb} {q.eng}</label>
                        </section>
                        <section className="test-answer">
                            <div className="test-answer-label">
                                {!props.examFinished ? 
                                    "Your Answer" : 
                                    isCorrect(q._id) ? "Correct!" : "Wrong!"
                                }
                            </div> 
                            <div className="test-answer-text">
                                <Input
                                    id={q._id}
                                    type="textarea"
                                    onInput={inputHandler}
                                    validators = {[VALIDATOR_TASK(q.eng)]}
                                    title="eng"
                                    class="inputDefault"
                                />
                                {props.examFinished ? 
                                    <span className="result-sign"> {isCorrect(q._id) ? <GrCheckmark/> : <GrClose/>} </span> 
                                : null}
                            </div>
                        </section>
                        {props.examFinished && !isCorrect(q._id) && 
                        <section className="correct-answer">
                            <span>Correct Answer</span>
                            <span>{q.eng}</span>
                        </section>
                        }
                    </article>
                )
            } 
            </div>
            <div className="test-result">
            {
            !props.examFinished ? 
                <Button xl type="submit">End Test</Button>
                : null                 
            }
            </div>
        </form>
    )
}

export default Exam;