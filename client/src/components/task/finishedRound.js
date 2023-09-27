const FinishedRound = (props)=>{
    //correctAnswersTotal
    //results
    //nextRound
    //correctRound
    //serb
    //eng
    return(
        <>
            <h2>Last Question</h2>
            <p>Overall Progress: {`${props.correctAnswersTotal}/${props.results.length}`}</p>
            <button onClick={props.nextRound}>Next round</button>

            <div>
            {
                props.results.map(result => {
                    if(result.correctRound===0){
                        return <div>Incorrect {result.serb} {result.eng} </div>
                    }else if(result.correctRound===props.round-1){
                        return <div>True {result.serb} {result.eng} </div>
                    }else{
                        return null
                    }
                })
            }
            </div>
        </>
    )
}

export default FinishedRound