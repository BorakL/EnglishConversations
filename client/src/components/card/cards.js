import { useEffect, useState } from "react";

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
        setFlip(!flip)
    }
 
    return(
        <div>
            <div onClick={flipOver}>{flip ? conversation[pointer].serb : conversation[pointer].eng}</div>
            <br/>
            <div>
                <div onClick={prevCard}>prev</div>
                <div onClick={nextCard}>next</div>
            </div>
        </div>
    )
}

export default Cards;