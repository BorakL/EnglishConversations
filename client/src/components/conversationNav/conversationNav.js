import { useState } from "react"
import Button from "../../components/button/button"

const ConversationNav = (props)=>{
    const {setList,list} = props
    return(
        <div className="conversationNav">
            <Button
                onClick={()=>setList(true)}
                active={list}
            >
                Learn
            </Button>
            <Button
                onClick={()=>setList(false)}
                active={!list} 
            >
                Flashcards
            </Button>
            <Button
                to="test"  
            >
                Test
            </Button>
        </div>
    )
}

export default ConversationNav