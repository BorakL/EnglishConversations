import Button from "../button/button";
import { CgSmileMouthOpen } from "react-icons/cg";
import { CgSmileNeutral } from "react-icons/cg";

const Result = (props)=>{

    return(
        <div className="result-container">
            <h2 className="answer-message">{!props.dontKnow && ( props.currentQuestion.correctRound>0 ? 
                                    <span className="correct-answer"><CgSmileMouthOpen/> Correct</span> :
                                    <span className="wrong-answer"><CgSmileNeutral/> Study this one! </span>
                                    ) }
            </h2>
            <div className="results-section">
                <div className="definition">
                    <h6>Serbian</h6>
                    <p>{props.dontKnow ? props.serb : props.currentQuestion.serb }</p>
                </div>
                {!props.dontKnow ? 
                <div className="your-answer">
                    <h6>YOU SAID</h6>
                    <p>{props.answer}</p>
                </div>
                :
                null}
                <div className="correct-answer">
                    <h6>Correct answer</h6>
                    <p>{props.dontKnow ? props.eng : props.currentQuestion.eng }</p>
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
                <div>
                    {/* <a >Override: I was correct</a> */}
                    <Button
                        type="text"  
                        icon
                        text
                        onClick={props.overrideHandler}
                    >
                        Override: I was correct
                    </Button>
                </div>
            </div>}
        </div>
    )
}

export default Result;