import {Link, useLocation} from 'react-router-dom'
import './conversationItem.scss'

const ConversationItem = ({conversation})=>{
    return(
        <div className="conversation-item">
            <Link to={`/conversations/${conversation._id}`} >
                <div className='conversation-item-infoSection'>
                    <span className="conversation-item-infoSection-terms">{conversation.conversation?.length || 0} Terms</span>
                    <span className="conversation-item-infoSection-users"></span>
                </div>
                <div className='conversation-item-titleSection'>
                    <span>{conversation.title}</span>
                </div> 
            </Link>
        </div>
    )
}

export default ConversationItem