import { useEffect, useState } from "react";
import Speech from 'react-text-to-speech'

const Cards = ({conversation})=>{

    const[pointer,setPointer]=useState(0)
    const[flip,setFlip] = useState(true)

    const nextCard = ()=>{
        if(pointer<conversation.length-1){
            setPointer(prev=>prev+1)
            setFlip(true)
        }
    }
    const prevCard = ()=>{
        if(pointer>0) {
            setPointer(prev=>prev-1)
            setFlip(true)
        }
    }
    const flipOver = ()=>{
        setFlip(prev=>!prev)
    }
 
    return(
        <div>
            <div onClick={flipOver}>{flip ? conversation[pointer].serb : conversation[pointer].eng}</div>
            <br/>
            <div>
                <div onClick={prevCard}>prev</div>
                <div onClick={nextCard}>next</div>
            </div>
            {!flip && <Speech text={conversation[pointer].eng} /> }
        </div>
    )
}

export default Cards;