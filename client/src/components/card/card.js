import { useEffect, useState } from "react"; 
import "./card.scss"
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
                  
                        <Button 
                            type="button"
                            onClick={prevCard}
                            disabled={pointer===0}
                        >
                            Prev
                        </Button>
            
                    <div>
                        {`${pointer+1}/${conversation.length}`}
                    </div>
               
                        <Button 
                            type="button"
                            onClick={nextCard}
                            disabled={pointer===conversation.length-1}
                        >
                            Next
                        </Button>
                  
                </div>
            </div>
            
        </div>
    )
}

export default Card;