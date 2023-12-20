import Button from "../../components/button/button" 

const ConversationNav = (props)=>{
    return(
        <nav>
            <div className="conversation-nav">
                <Button lg navLink to={`list`}>Learn</Button>
                <Button lg navLink to={`learn`}>Flashcards</Button>
                <Button lg navLink to={`test`}>Test</Button>
            </div>
        </nav>
    )
}

export default ConversationNav