import { useEffect, useState } from "react"; 
import "./card.scss"
import Button from "../button/button";
import {GrLinkNext,GrLinkPrevious} from "react-icons/gr"
import { useOutletContext } from "react-router";

const Card = ()=>{

    const outletContext = useOutletContext();
    console.log("conversation",outletContext.conversation.conversation)

    const[pointer,setPointer]=useState(0)
    const[flip,setFlip] = useState(false)

    const nextCard = ()=>{
        if(pointer<outletContext.conversation.conversation.length-1){
            setPointer(prev=>prev+1)
            setFlip(false)
        }
    }
    const prevCard = ()=>{
        if(pointer>0) {
            setPointer(prev=>prev-1)
            setFlip(false)
        }
    }
    const flipCard = ()=>{ 
        setFlip(prev=>!prev)
    }
 
    return( 
        <div className="flashCard">
            <div className={`flip-card ${flip ? " flip-active" : ""}`} onClick={flipCard}>
                <div className = "flip-card-inner">
                    <div className="flip-card-front">
                        <p>{outletContext.conversation.conversation[pointer].serb}</p>
                    </div>
                    <div className="flip-card-back">
                        <p>{outletContext.conversation.conversation[pointer].eng}</p>
                    </div>
                </div>
            </div>
            <div className="flashCardButtons"> 
                <Button 
                    type="button"
                    onClick={prevCard}
                    disabled={pointer===0}
                    style="buttonIcon"
                >
                    <GrLinkPrevious/>
                </Button> 
                <div>
                    {`${pointer+1}/${outletContext.conversation.conversation.length}`}
                </div> 
                <Button 
                    type="button"
                    onClick={nextCard}
                    disabled={pointer===outletContext.conversation.conversation.length-1}
                    style="buttonIcon"
                >
                    <GrLinkNext/>
                </Button> 
            </div>
        </div> 
    )
}

export default Card;