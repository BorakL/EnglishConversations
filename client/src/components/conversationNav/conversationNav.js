import Button from "../../components/button/button" 
import Sentence from "../sentence/sentence";

const ConversationNav = (props)=>{
    return(
        <nav>
            <div className="conversationNav">
                <Button element={"navLink"} to={`list`}>Learn</Button>
                <Button element={"navLink"} to={`learn`}>Flashcards</Button>
                <Button element={"navLink"} to={`test`}>Test</Button>
            </div>
        </nav>
    )
}

export default ConversationNav