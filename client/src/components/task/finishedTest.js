const FinishedTest = (props)=>{
    //results
    //round
    //getAllResults
    return(
        <div>
            <h1>The end</h1>
            <div>
            {
                props.getAllResults(props.results, props.round).map((result,i) =>
                    <div key={i}>
                        <h3>Round {i+1}</h3>
                        {result}
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default FinishedTest;