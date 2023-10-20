import { useEffect } from "react";
import Button from "../button/button";

const Result = (props)=>{
 
//correctRound
//eng
//next
//refNext
//dontKnow
//overrideHandler 
    return(
        <div className="resultContainer">
            <h2>{!props.dontKnow && ( props.currentQuestion.correctRound>0 ? 
                                    <span className="correctAnswer">Correct</span> :
                                    <span className="wrongAnswer">Study this one!</span>
                                    ) }
            </h2>
            <div className="resultsSection">
                <div className="definition">
                    <h6>Serbian</h6>
                    <p>{props.serb}</p>
                </div>
                {!props.dontKnow ? 
                <div className="yourAnswer">
                    <h6>YOU SAID</h6>
                    <p>{props.answer}</p>
                </div>
                :
                null}
                <div>
                    <h6>Correct answer</h6>
                    <p>{props.eng}</p>
                </div>
            </div> 
            <div>
                <Button
                    onClick={props.next}
                    refNext={props.refNext}
                    size="md" 
                >
                    Next
                </Button>
            </div>
            {!props.dontKnow && <div>
                <Button 
                    type="button" 
                    style="buttonText"
                    onClick={props.overrideHandler}
                >
                    Override: I was correct
                </Button> 
            </div>}
        </div>
    )
}

export default Result;