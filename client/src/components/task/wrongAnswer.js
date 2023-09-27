const WrongAnswer = (props)=>{
//correctRound
//eng
//next
//refNext
//dontKnow
//overrideHandler
    return(
        <>
        {!props.dontKnow && <p>{props.correctRound ? "Correct" : "Wrong"}</p>}
        <p>Correct answer: {props.eng}</p>
        <button onClick={props.next} ref={props.refNext}>Next</button>
        {!props.dontKnow && <div>
            <button  type="button" onClick={props.overrideHandler}>Override: I was correct</button> 
        </div>}
        </>
    )
}

export default WrongAnswer;