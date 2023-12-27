import Button from "../../components/button/button" 
import "./conversationNav.scss"
import { TbCards } from "react-icons/tb";
import { IoIosList } from "react-icons/io";
import { TbStairsUp } from "react-icons/tb";

const ConversationNav = (props)=>{    
    return(
        <nav>
            <div className="conversation-nav">
                <Button xl navLink to={`terms`}>
                    <div className="btn-content">
                        <span><IoIosList/></span> <span>Terms</span>  
                    </div>
                </Button>
                <Button xl navLink to={`flashcards`}>
                    <div className="btn-content">
                        <span><TbCards/></span> <span>Flashcards</span>
                    </div>                 
                </Button>
                <Button xl navLink to={`practice`}>
                    <div className="btn-content">
                       <span><TbStairsUp/></span> <span>Practice</span>
                    </div>
                </Button>
            </div>
        </nav>
    )
}

export default ConversationNav