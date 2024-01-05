import { useState } from "react"
import Modal from "../uiElements/modal"
import Button from "../button/button"
import "./taskInfo.scss"

const FinishedRound = (props)=>{

    const[show,setShow]=useState(true)
    const closeHandler = ()=>{
        setShow(false)
        props.setNextRoundMessage(false)
    }

    return(
        <Modal
            show={show}
            closeHandler={closeHandler}
            header={<h2>Last Question</h2>}
        > 
            <div className="taskInfo">
                <div className="taskInfo-progress">
                    <p>Overall Progress: {`${props.correctAnswersTotal}/${props.results.length}`}</p>
                </div>
                <div className="taskInfo-button">
                    <Button onClick={closeHandler}>Next round</Button>
                </div>
                
                <div className="taskInfo-terms">
                {
                    props.results.map(result => {
                        if(result.correctRound===0){
                            return <div key={result.serb}>{result.serb} {result.eng} </div> 
                        }
                    })
                }
                </div>
            </div>
        </Modal>
    )
}

export default FinishedRound