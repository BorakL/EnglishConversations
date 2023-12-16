import Button from "../../components/button/button" 
import Sentence from "../sentence/sentence";

const ConversationNav = (props)=>{
    return(
        <nav>
            <div className="conversationNav">
                <Button lg navLink to={`list`} gt>Learn</Button>
                <Button lg navLink to={`learn`}>Flashcards</Button>
                <Button lg navLink to={`test`}>Test</Button>
            </div>
        </nav>
    )
}

export default ConversationNav