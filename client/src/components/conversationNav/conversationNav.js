import Button from "../../components/button/button" 
import "./conversationNav.scss"

const ConversationNav = (props)=>{
    return(
        <nav>
            <div className="conversation-nav">
                <Button xl navLink to={`terms`}>Terms</Button>
                <Button xl navLink to={`flashcards`}>Flashcards</Button>
                <Button xl navLink to={`practice`}>Practice</Button>
            </div>
        </nav>
    )
}

export default ConversationNav