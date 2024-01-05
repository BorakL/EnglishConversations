import Button from "../button/button";
import "./taskInfo.scss"

const FinishedTest = (props)=>{
    return(
        <div className="taskInfo">
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
            <div className="taskInfo-button">
                <Button >Start again</Button>
            </div>
        </div>
    )
}

export default FinishedTest;