import Button from "../../components/button/button" 
import "./conversationNav.scss"

const ConversationNav = (props)=>{
    return(
        <nav>
            <div className="conversation-nav">
                <Button xl navLink to={`list`}>Learn</Button>
                <Button xl navLink to={`learn`}>Flashcards</Button>
                <Button xl navLink to={`test`}>Test</Button>
            </div>
        </nav>
    )
}

export default ConversationNav