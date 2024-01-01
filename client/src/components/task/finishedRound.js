import { useState } from "react"
import Modal from "../uiElements/modal"
import Button from "../button/button"

const FinishedRound = (props)=>{
    //correctAnswersTotal
    //results
    //nextRound
    //correctRound
    //serb
    //eng

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
            <p>Overall Progress: {`${props.correctAnswersTotal}/${props.results.length}`}</p>
            <Button onClick={closeHandler}>Next round</Button>

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
        </Modal>
    )
}

export default FinishedRound