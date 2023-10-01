import { useEffect, useState } from "react";
import Speech from 'react-text-to-speech'
import {CSSTransition} from 'react-transition-group'
import "./card.css"
import Button from "../button/button";

const Card = ({conversation})=>{

    const[pointer,setPointer]=useState(0)
    const[flip,setFlip] = useState(false)

    const nextCard = ()=>{
        if(pointer<conversation.length-1){
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
        <div>
            <div className="flashCard">
                <div className={`flip-card ${flip ? " flip-active" : ""}`} onClick={flipCard}>
                    <div className = "flip-card-inner">
                        <div className="flip-card-front">
                            <p>{conversation[pointer].serb}</p>
                        </div>
                        <div className="flip-card-back">
                            <p>{conversation[pointer].eng}</p>
                        </div>
                    </div>
                </div>
                <div className="flashCardButtons">
                    <div>
                        <Button 
                            type="button"
                            onClick={prevCard}
                        >
                            Prev
                        </Button>
                    </div>
                    <div>
                        <Button 
                            type="button"
                            onClick={nextCard}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Card;